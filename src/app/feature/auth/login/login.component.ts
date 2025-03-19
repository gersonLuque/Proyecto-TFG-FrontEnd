import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDto } from '../../../core/dto/loginRequestDto';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LoginButtonComponent } from 'app/shared/components/buttons/login/login-button/login-button.component';
import { InputLoginComponent } from 'app/shared/components/inputs/input-login/input-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoginButtonComponent, InputLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async logIn() {
    if (this.loginForm.valid) {
      const dtoLogin: LoginRequestDto = { ...this.loginForm.value };
      await lastValueFrom(this.authService.login(dtoLogin));
    }
  }
}
