import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Signup } from 'src/app/Models/signup';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser:any
  signUpForm!: FormGroup;
  passwordType!:boolean;
  showText!: boolean;

  constructor(private authdata: AuthServiceService, private fb: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
  }

  initsignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  createNewUser() {
    const payload = this.signUpForm.value;
    // console.log(payload)
    sessionStorage.setItem('newUserDetails', JSON.stringify(this.signUpForm.value))
    // this.loginUser(payload)
  }

  showPassword() {
    this.passwordType = !this.passwordType;
    this.showText = !this.showText;
  }

}
