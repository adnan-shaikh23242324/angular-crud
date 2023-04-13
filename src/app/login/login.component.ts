import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastservice: NgToastService, private api: ApiService) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[ Validators.required,Validators.minLength(8)]],
    })
  }
  // login(){
  //   this.http.get<any>("http://localhost:3000/signupusers")
  //   .subscribe(res=>{
  //     const user = res.find((a:any)=>{
  //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password  
  //     });
  //     if(user){
  //       // alert("Login Success!!");
  //       this.toastservice.success({ detail: "Success", summary: "Login Successfully", duration: 3000 });

  //       this.loginForm.reset();
  //       this.router.navigate(['register'])

  //     }else{
  //       // alert("user not found!!");
  //       this.toastservice.success({ detail: "Fail to Login", summary: "Enter valid email &password", duration: 3000 });

  //     }
  //   }
  //   ,err=>{
  //     alert("Something went wrong!!")
  //   } 
  //   )

  // }
  login() {
    this.http.get<any>("http://localhost:3000/signupusers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (this.loginForm.valid) {
          this.api.postRegistration(this.loginForm.value)
            .subscribe(res => {
              this.toastservice.success({ detail: "Success", summary: "Login Successfull", duration: 3000 });
              this.loginForm.reset();
              this.router.navigate(['register'])


            })
        } else {
          this.toastservice.success({ detail: "Failed", summary: "Enter Valid Email & Address", duration: 3000 });


        }


      }
      )

  }
}
