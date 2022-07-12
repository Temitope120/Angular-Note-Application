import { AuthServiceService } from './../../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/login';
import { flush } from '@angular/core/testing';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordType!: boolean;
  showText!: boolean;
  userDetails: any;
  errorMessage:any
  // commonQuestions: any[] = ["Who is the founder of PiggyVest?", "How much can I save weekly?", "Can I terminate a plan anytime?"];
  // display = "block";
  display:boolean = true;
  // hide = "none"
  loopedItem: any;

  
  constructor(private router: Router, private fb: FormBuilder, private authdata: AuthServiceService) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.displayCommonQuestions();
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitLogin() {
    const payload = this.loginForm.value;
    // console.log(payload)
    sessionStorage.setItem('loginDetails', JSON.stringify(this.loginForm.value))
    this.loginUser(payload)
  }
  showPassword() {
    this.passwordType = !this.passwordType;
    this.showText = !this.showText;
  }


  displayCommonQuestions(){
    // for(let i = 0; i < this.commonQuestions.length; i++){
    //   // console.log('Each element in the input array', this.commonQuestions[i])
    //   const loopedItem =  this.commonQuestions[i]
    //   // console.log('Looped items are', loopedItem);
    //   // console.log('Index of Each item as the loop goes', this.commonQuestions.indexOf(loopedItem));
    //   setInterval(() => {
    //     // console.log('This is value i in setInterval', i)
    //     if(i == 0){
    //       console.log('The first item', this.commonQuestions[i])
    //       this.commonQuestions[i]
    //        this.display = false;
    //     }else if(i == this.commonQuestions.length){
    //       // console.log('The last item', this.commonQuestions[i - 1])
    //       this.commonQuestions[i - 1]
    //        this.display = false;
    //       // console.log('the first should display',this.commonQuestions[0] )
    //       this.commonQuestions[0]
    //        this.display
    //       i = 0;
    //     } else{
    //       this.commonQuestions[i - 1]
    //       this.display = false;
    //       this.commonQuestions[i]
    //        this.display;
    //     } 
    //     i++
    //   }, 1000);
    // }
    
  }


  

  
  loginUser(payload: Login) {
    this.authdata.signIn(payload).subscribe((res) => {
      this.userDetails = res;
      sessionStorage.setItem('UserDetails', JSON.stringify(this.userDetails))
      this.router.navigate([`main/dashboard`]).then();
    }, (error: any) =>{
      this.errorMessage = error
      console.log(error)
      this.router.navigate([`/auth/`]).then();
      console.log("An Error Occured, can't Login")
      // navigate the user to the signup page to register first before signing in.
    })

  }



}
