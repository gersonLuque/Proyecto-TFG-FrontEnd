import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateTaskComponent} from './create-task/create-task.component';
import {TaskManagementComponent} from './task-management.component';

const routes: Routes = [
  {
    path: '',
    component:TaskManagementComponent,
  },
  {
    path: 'create-task',
    component:CreateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
