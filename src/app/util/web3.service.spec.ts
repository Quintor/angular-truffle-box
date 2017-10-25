import { TestBed, inject } from '@angular/core/testing';

import {Web3Service} from './web3.service';

declare let window: any;

describe('Web3Service', () => {
  beforeEach(() => {
    const currentProvider = {
      test: 5
    };

    const getAccounts = (callback) => {
          callback(0, ['0xdeadbeefdeadbeefdeadbeef']);
        };

    const mockWeb3 = {
      currentProvider: currentProvider,
      eth: {
        getAccounts: getAccounts
      }
    };
    window.web3 = mockWeb3;
    TestBed.configureTestingModule({
      providers: [Web3Service]
    });
  });

  it('should be created', inject([Web3Service], (service: Web3Service) => {
    expect(service).toBeTruthy();
  }));
});
