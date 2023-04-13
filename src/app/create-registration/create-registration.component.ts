import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { DateAdapter } from '@angular/material/core';
import { NgConfirmService } from 'ng-confirm-box';


@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  [x: string]: any;
  public packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  public genders: string[] = ["Male", "Female"];
  public importantList: string[] = [
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"];
  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>, private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService, private toastservice: NgToastService,private confirm:NgConfirmService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^([+-]{0,1}[ ]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[ ]{0,1}){0,4}$')]],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResults: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],


    });
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserTd(this.userIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);

        })
    })
  }
  submit() {
    if (this.registerForm.valid) {
      this.api.postRegistration(this.registerForm.value)
        .subscribe(res => {
          this.toastservice.success({ detail: "Sucess", summary: "Enqiury Added", duration: 3000 });
          this.registerForm.reset();

        })
    }
  

  }
  update() {

    this.api.updateRegisteredUser(this.registerForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastservice.success({ detail: "Sucess", summary: "Enqiury Added", duration: 3000 });
        this.registerForm.reset();
        this.router.navigate(['list'])

      })
  }
  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;

      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;

      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");

        break;


    }

  }
  fillFormToUpdate(user: User) {
    this.registerForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResults: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    })
  }
  


}
