import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastservice: NgToastService, private api: SignupService) { }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      mobile: ['',Validators.required],

    })
  }
  // signUp(){
  //   this.http.post<any>("http://localhost:3000/signupusers",this.signupForm.value)
  //   .subscribe(res=>{
  //     // alert("Signup Successfull");
  //     if(User){

  //       this.toastservice.success({ detail: "Success", summary: "Signup Successfully", duration: 3000 });

  //       this.signupForm.reset;
  //       this.router.navigate(['login']);
  //     }
  //     else{
  //       this.toastservice.success({ detail: "Enter Detail", summary: "Enter Details", duration: 3000 });


  //     }

  //   }
  //   // ,err=>{
  //   //   alert("Something Went Wrong")
  //   // }
  //   )
  // }
  signUp() {
    if (this.signupForm.valid) {
      this.api.postRegistration(this.signupForm.value)
        .subscribe(res => {
          this.toastservice.success({ detail: "Success", summary: "Signup Successfull", duration: 3000 });
          this.signupForm.reset();

        })
    }else{
      this.toastservice.success({ detail: "Failed", summary: "Enter Mandatory Fields", duration: 3000 });

    }

  }
}
