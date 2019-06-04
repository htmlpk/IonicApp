import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AccordionComponent } from '../accordion/accordion.component';
import { AccordionCustomComponent } from '../accordion-custom/accordion-custom.component';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],  declarations: [HomePage,AccordionComponent,AccordionCustomComponent],
  exports:[]
})
export class HomePageModule {}
