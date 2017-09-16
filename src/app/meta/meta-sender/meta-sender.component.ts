import {Component, OnInit} from '@angular/core';



import {Web3Service} from "../../util/web3.service";

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {
  constructor(private web3Service : Web3Service) {
    console.log("Constructor: " + web3Service);
  }

  ngOnInit(): void {
    console.log("OnInit: " + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.MetaCoin = new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.web3Service.ready) {
          resolve(this.web3Service.MetaCoin);
        }
      }, 100)
    });
  }

  accounts : string[];
  MetaCoin : Promise<any>;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }

  setStatus(status) {
    this.status = status;
  };

  sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus("Metacoin is not loaded, unable to send transaction");
      return;
    }
    let self = this;
    console.log("Sending coins" + self.model.amount + " to " + self.model.receiver);


    let amount = self.model.amount;
    let receiver = self.model.receiver;

    this.setStatus("Initiating transaction... (please wait)");

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then(function(metaCoinInstance) {
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
    console.log("Refreshing balance");

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then(function(metaCoinInstance) {
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
