import {Injectable, OnInit} from '@angular/core';
import {default as Web3} from 'web3';
import {WindowRefService} from "./window-ref.service";

import {default as contract} from 'truffle-contract'
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json'

@Injectable()
export class Web3Service {

  private web3 : Web3;
  private accounts : string[];
  private ready : boolean = false;
  private MetaCoin;

  constructor(private windowRef : WindowRefService) {
    this.MetaCoin = contract(metacoin_artifacts);
    this.checkAndRefreshWeb3();
    setInterval(() => this.checkAndRefreshWeb3(), 100);
  }

  private checkAndRefreshWeb3() {
    if (this.ready) {
      this.refreshAccounts();
      return;
    }

    if (this.windowRef.nativeWindow) {
      if (this.windowRef.nativeWindow.web3) {
        console.log('Using provided web3 implementation');
        this.web3 = new Web3(this.windowRef.nativeWindow.web3.currentProvider);
        // Bootstrap the MetaCoin abstraction for Use.
        this.MetaCoin.setProvider(this.web3.currentProvider);

        this.refreshAccounts();
      }
      else {
        console.log("Not finding web3");
      }
    }
    else {
      console.log("Can't get window reference");
    }
  };

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      this.accounts = accs;
      this.ready = true;
    });
  }

  getAccounts() : Promise<string[]> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.ready) {
          return resolve(this.accounts);
        }
      }, 100);
    });
  }

  metaCoin() : Promise<any> {
    return new Promise((resolve, reject) => {
      setInterval(()=> {
        if (this.ready) {
          return resolve(this.MetaCoin);
        }
      }, 100);
    });
  }

}
