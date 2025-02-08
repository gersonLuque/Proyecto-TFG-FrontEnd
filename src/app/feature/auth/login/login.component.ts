import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  public loginForm: FormGroup;
  constructor(private router:Router, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  public logIn(){
    if(this.loginForm.valid){
      console.log('el formulario es valido')
    }
  }
}
