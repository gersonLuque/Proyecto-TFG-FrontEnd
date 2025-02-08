import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequestDto} from '../../../core/dto/LoginRequestDto';
import {lastValueFrom} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';

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
  constructor(private router:Router, private fb:FormBuilder,private authService:AuthService) {
    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  public async logIn(){
    let login:LoginRequestDto
    if(this.loginForm.valid){
      const dtoLogin:LoginRequestDto = { ...this.loginForm.value}
      console.log(dtoLogin)
      await lastValueFrom(this.authService.login(dtoLogin))
    }
  }
}
