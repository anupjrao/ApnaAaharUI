import { Component, OnInit } from '@angular/core';
import {aboutUs, termsOfUse} from '../../footerData';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  values:string[]=aboutUs;
  termsOfUse:string[]=termsOfUse;
  ngOnInit(): void {
  }

}
