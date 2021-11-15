import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error:string ='';

  registerForm = new FormGroup({
    first_name: new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(10),Validators.pattern("[A-Za-z0-9]{3,10}$")]),
    last_name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(10),Validators.pattern("[A-Za-z0-9]{3,10}$")]),
    age: new FormControl(null,[Validators.required, Validators.min(14), Validators.max(60)]),
    email: new FormControl(null,[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl(null,[Validators.required,Validators.maxLength(16),Validators.minLength(8),Validators.pattern("^[A-Z][a-z0-9]{8,16}$")]),

  })

  constructor(private _AuthService:AuthService,private _Router:Router) { }

  ngOnInit(): void {
  }

  submitRegisterForm(registerForm:FormGroup){
    console.log(registerForm.value);
    this._AuthService.register(registerForm.value).subscribe({
      next:(response)=> {
        if(response.message == "success"){
          this._Router.navigate(['login']);
          // console.log(response);
        }
        else{
          this.error = response.errors.email.message;
          console.log(this.error);
        }
      },
      error:(error)=> console.log(error),
    })
  }
}
