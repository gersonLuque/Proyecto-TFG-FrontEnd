import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';
import {RouterLink} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {firstValueFrom, lastValueFrom, Observable} from 'rxjs';
import {UserJwtDto} from '@core/dto/userJwtDto';
import {AsyncPipe} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ChangePassword} from '@core/dto/change-password';
import {ToastService} from '@core/services/toast.service';

@Component({
  selector: 'app-nav-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    FooterComponent
    AsyncPipe,
    Menubar,
    Dialog,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.css'
})
export class NavLayoutComponent implements OnInit {

  items: MenuItem[];
  currentUser$: Observable<UserJwtDto>
  visible:boolean;
  changePasswordForm: FormGroup;

  constructor(private authService: AuthService,private fb: FormBuilder,private toastService: ToastService) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Cambiar contraseña',
            icon: 'pi pi-key',
            command: () => {
              this.visible = true;
              this.changePasswordForm = this.fb.group({
                currentPassword: [''],
                newPassword: [''],
              })
            }
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-power-off',
            command: () => {
              this.authService.logout();
            }
          }
        ]
      }
    ]
  }

  public async changePassword() {
    const changePasswordDto: ChangePassword = this.changePasswordForm.value;
    await firstValueFrom(this.authService.changePassword(changePasswordDto))
    .then(() => {
      this.toastService.showSuccess('Contraseña cambiada correctamente');
      this.visible = false;
    })
    .catch(error => {
      const errorMessage = (typeof error?.error === 'string') ? error.error : '';
      this.toastService.showError(`Error : ${errorMessage}`);
    });
  }
}
