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
    setInterval(() => this.refreshAccount(), 1000);
  }

  accounts : string[];

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";

  refreshAccount() {
    this.web3Service.getAccounts().then((accounts) => {
      this.accounts = accounts;
      if (!this.model.account) {
        this.model.account = accounts[0];
        this.refreshBalance();
      }
    }).catch(function(err) {
      console.log("Error while getting account");
    });
  }

  setStatus(status) {
    this.status = status;
  };

  sendCoin() {
    let self = this;
    console.log("Sending coins" + self.model.amount + " to " + self.model.receiver);


    let amount = self.model.amount;
    let receiver = self.model.receiver;

    this.setStatus("Initiating transaction... (please wait)");

    this.web3Service.metaCoin().then(function(metaCoin) {
      return metaCoin.deployed();
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

    this.web3Service.metaCoin().then(function(metaCoin) {
      return metaCoin.deployed();
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
