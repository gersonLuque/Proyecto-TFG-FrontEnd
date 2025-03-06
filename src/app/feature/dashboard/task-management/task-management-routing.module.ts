import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskManagementComponent} from './task-management.component';

const routes: Routes = [
  {
    path: '',
    component:TaskManagementComponent,
  },
  {
    path: 'create-task',
    loadComponent: () => import('./create-task/create-task.component')
  },
  {
    path: 'edit-task/:taskId',
    loadComponent: () => import('./edit-task/edit-task.component')
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
