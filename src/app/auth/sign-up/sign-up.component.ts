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
  newUser: any
  signUpForm!: FormGroup;
  passwordType!: boolean;
  showText!: boolean;

  constructor(private authdata: AuthServiceService, private fb: FormBuilder, private router: Router) { }
  errorMessage: any;
  ngOnInit(): void {
    this.initsignUpForm();
  }

  initsignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  createNewUser() {
    const payload = this.signUpForm.value;
    sessionStorage.setItem('newUserDetails', JSON.stringify(this.signUpForm.value))
    this.SignUp(payload)
  }

  showPassword() {
    this.passwordType = !this.passwordType;
    this.showText = !this.showText;
  }

  SignUp(payload: Signup){
    this.authdata.signUp(payload).subscribe((res) => {
      console.log('Sign up Response', res)
      this.router.navigate([`/auth/`]).then();
    }, (error: any) =>{
      this.errorMessage = error
      console.log(error)
      console.log("An Error Occured, can't SignUp")
    })
  }
}
