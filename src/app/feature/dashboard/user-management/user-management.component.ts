import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '@core/services/user.service';
import {catchError, lastValueFrom, Observable} from 'rxjs';
import {UserResponsedDto} from '@core/dto/userResponsedDto';
import {AsyncPipe} from '@angular/common';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmService} from '@core/services/confirm.service';
import {ToastService} from '@core/services/toast.service';
import {AddHeaderListComponent} from '../../../shared/components/add-header-list/add-header-list.component';

@Component({
  selector: 'app-user-management',
  imports: [
    RouterOutlet,
    AsyncPipe,
    RouterLink,
    Toast,
    ConfirmDialog,
    AddHeaderListComponent
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit{
  public users$:Observable<UserResponsedDto[]>;

  constructor(private _userService:UserService,
              private confirmService:ConfirmService,
              private toastService:ToastService) { }

  showConfirmDelete(user:UserResponsedDto){
    this.confirmService.showDeleteDialog(`¿Estas seguro de eliminar al usuario ${user.completeName}?`,async () => {
      await lastValueFrom(this._userService.deleteUser(user.userId));
      this.toastService.showSuccess(`Usuario ${user.completeName} eliminado correctamente`);
      this.users$ = this._userService.getAllUsers();
    });
  }

  ngOnInit() {
    this.users$ = this._userService.getAllUsers();
  }
}
