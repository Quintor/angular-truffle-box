import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Web3Service} from './web3.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Web3Service
  ],
  declarations: []
})
export class UtilModule {
}
