import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from './user-management.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path : '',
    component : UserManagementComponent
  },
  {
    path : 'create-user',
    component : CreateUserComponent
  },
  {
    path : 'edit-user/:id',
    component : EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
