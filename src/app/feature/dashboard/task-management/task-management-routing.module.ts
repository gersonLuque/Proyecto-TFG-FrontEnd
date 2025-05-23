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
  },
  {
    path: 'create-solution/:taskId',
    loadComponent: () => import('./create-solution/create-solution.component')
  },
  {
    path: 'show-solutions/:taskId',
    loadChildren: () => import('./show-solutions-list/show-solutions.module').then(m => m.ShowSolutionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
