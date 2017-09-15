import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WindowRefService} from './window-ref.service';
import {Web3Service} from "./web3.service";
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Web3Service,
    WindowRefService
  ],
  declarations: []
})
export class UtilModule { }
