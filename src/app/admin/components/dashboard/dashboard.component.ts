import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MspComponent } from '../msp/msp.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  @ViewChild(MspComponent,{static:false}) reload:MspComponent;
  constructor() { }
  ngAfterViewInit(): void {
   if(!this.reload.updateEvent){
     this.reload.editField=undefined;
     this.reload.ngOnInit();
   }
  }

  ngOnInit(): void {
  }
  
  check(event){
    if(event.index==0 || event.index==1){
    this.ngAfterViewInit();
    }
  }
}
