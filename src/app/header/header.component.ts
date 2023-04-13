import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private toastservice: NgToastService){}
  ngOnInit(): void {
  }

  logout(){
    // this.confirm.showConfirm("Are you sure want to delete?");

    this.toastservice.success({detail:'SUCESS',summary:'Logout Succesfully',duration:3000})

  }

}
