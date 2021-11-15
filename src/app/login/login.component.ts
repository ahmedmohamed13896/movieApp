import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 error:string ='';

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl(null,[Validators.required,Validators.maxLength(16),Validators.minLength(8),Validators.pattern("^[A-Z][a-z0-9]{8,16}$")]),
  })

  constructor(private _AuthService:AuthService,private _Router:Router) { }

  ngOnInit(): void {
  }

  submitLoginForm(loginForm:FormGroup){
    console.log(loginForm.value);
    this._AuthService.login(loginForm.value).subscribe({
      next:(response)=> {
        if(response.message == "success"){
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveCurrentUser();
          this._Router.navigate(['home']);
          // console.log(response);
        }
        else{
          this.error = response.message;
          // console.log(this.error);
        }
      },
      error:(error)=> console.log(error),
    })
  }

}
