import { error } from '@angular/compiler/src/util';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { ContactRequest } from '../Models/ContactRequest';
import { User } from '../Models/User';
import { ListingDataService } from './services/listing-data.service';

@Directive({
  selector: '[appContactRequestButton]'
})
export class ContactRequestButtonDirective implements OnInit {
  User: User;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {
    this.User = JSON.parse(sessionStorage.getItem('authToken'));
    this.setColor();
  }
  setColor():boolean{
    if (this.elementRef.nativeElement.value == 'true') {
      this.elementRef.nativeElement.innerText = 'Contacted';
      this.elementRef.nativeElement.style.backgroundColor = "red";
      return true;
    }
    if(this.elementRef.nativeElement.value=='false') {
      this.elementRef.nativeElement.innerText = 'Contact';
      this.elementRef.nativeElement.style.backgroundColor = "#329168";
      return false;
    }
  }
  @HostListener('click') click() {
    this.ngOnInit();
  }
}
