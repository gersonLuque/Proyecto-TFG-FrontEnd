import {AfterViewInit, Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDto } from '@core/dto/loginRequestDto';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { LoginButtonComponent } from 'app/shared/components/buttons/login/login-button/login-button.component';
import { InputLoginComponent } from 'app/shared/components/inputs/input-login/input-login.component';
import {FloatLabel} from 'primeng/floatlabel';
import {Password} from 'primeng/password';
import { PasswordModule } from 'primeng/password';
import { InputContraComponent } from 'app/shared/components/inputs/input-login/input-contra/input-contra/input-contra.component';
import {ToastService} from '@core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoginButtonComponent, InputLoginComponent,  PasswordModule, InputContraComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,private toastService:ToastService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async logIn() {
    try {
      const dtoLogin: LoginRequestDto = { ...this.loginForm.value };
      await lastValueFrom(this.authService.login(dtoLogin));
    }catch (error){
      this.toastService.showError("Usuario o contraseña incorrectos");
    }

  }
}
