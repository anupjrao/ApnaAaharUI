import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    sessionStorage.removeItem("TracedValue");
  }
  AddProduct(){
    this.router.navigate(['/farmer/chooseProduct']);
  }
  checkDeals(){
    sessionStorage.setItem("DealComponentTriggered","1");
    this.router.navigate(['/farmer/Deals']);
  }
}
