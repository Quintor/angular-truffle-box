import {Component, OnInit} from '@angular/core';

import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'

import metacoin_artifacts from '../../../../build/contracts/MetaCoin.json'
import {WindowRefService} from "../../util/window-ref.service";

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {

  constructor(private windowRef: WindowRefService) {
  }

  ngOnInit() {
    this.checkAndRefreshWeb3();
    setInterval(this.checkAndRefreshWeb3, 100);
  }

  MetaCoin = contract(metacoin_artifacts);

  web3 : Web3;
  accounts : string[];

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";

  checkAndRefreshWeb3() {
    if (this.web3) {
      return;
    }
    if (this.windowRef.nativeWindow) {
      if (this.windowRef.nativeWindow.web3) {
        console.log('Using provided web3 implementation');
        this.web3 = new Web3(this.windowRef.nativeWindow.web3.currentProvider);
        // Bootstrap the MetaCoin abstraction for Use.
        this.MetaCoin.setProvider(this.web3.currentProvider);

        let self = this;

        this.web3.eth.getAccounts(function (err, accs) {
          if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
          }

          // Get the initial account balance so it can be displayed.
          if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
          }

          self.accounts = accs;
          self.model.account = accs[0];

          console.log("Setting account");
          console.log(self.model.account);
        });

        this.refreshBalance();
      }
      else {
        console.log("Not finding web3");
      }
    }
    else {
      console.log("Can't get window reference");
    }
  };

  setStatus(status) {
    this.status = status;
  };

  sendCoin() {
    let self = this;
    console.log("Sending coins" + self.model.amount + " to " + self.model.receiver);


    let amount = self.model.amount;
    let receiver = self.model.receiver;

    this.setStatus("Initiating transaction... (please wait)");

    self.MetaCoin.deployed().then(function(metaCoinInstance) {
      return metaCoinInstance.sendCoin(receiver, amount, {from: self.model.account});
    }).then(function(success) {
      if (!success) {
        self.setStatus("Transaction failed!");
      }
      else {
        self.setStatus("Transaction complete!");
      }

      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  };

  refreshBalance() {
    let self = this;

    self.MetaCoin.deployed().then(function (metaCoinInstance) {
      return metaCoinInstance.getBalance.call(self.model.account, {from: self.model.account});
    }).then(function (value) {
      console.log("Found balance: " + value);
      self.model.balance = value.valueOf();
    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  };

  clickAddress(e) {
    this.model.account = e.target.value;
    this.refreshBalance();
  }

  setAmount(e) {
    console.log("Setting amount: " + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log("Setting receiver: " + e.target.value);
    this.model.receiver = e.target.value;
  }

}
