import {Injectable} from '@angular/core';
import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import {Subject} from 'rxjs/Rx';

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: Web3;
  private accounts: string[];
  public ready = false;
  public MetaCoin: any;
  public accountsObservable = new Subject<string[]>();

  constructor() {
    this.MetaCoin = contract(metacoin_artifacts);

    window.addEventListener('load', (event) => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }
      this.MetaCoin.setProvider(this.web3.currentProvider);
      setInterval(() => this.refreshAccounts(), 100);
    });
  }

  private refreshAccounts() {
    console.log('refreshing accounts');
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');
        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
