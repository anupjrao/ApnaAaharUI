import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SearchComponent} from '../shared/components/search/search.component'

import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[
  ]
})
export class HomeModule { }
