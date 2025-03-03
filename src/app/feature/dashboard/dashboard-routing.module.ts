import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {EditUserComponent} from './user-management/edit-user/edit-user.component';
import {TaskManagementComponent} from './task-management/task-management.component';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent
  },
  {
    path : 'user-management',
    loadChildren : () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path : 'task-management/:id',
    loadChildren : () => import('./task-management/task-management.module').then(m => m.TaskManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
