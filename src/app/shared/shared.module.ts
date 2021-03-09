import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import {MaterialModule} from '../material.module'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SearchComponent
    
  ]
})
export class SharedModule { }
