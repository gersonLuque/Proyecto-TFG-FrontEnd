import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { PopUpComponent } from './components/pop-up/pop-up/pop-up.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ToastModule,
    MenuModule,
    ButtonModule,
  ],
  exports: [
    
  ]
})
export class SharedModule { }