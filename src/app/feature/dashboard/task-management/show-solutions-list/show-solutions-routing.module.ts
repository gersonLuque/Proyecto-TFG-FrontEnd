import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowSolutionsListComponent} from './show-solutions-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShowSolutionsListComponent
  },
  {
    path: ':prefix/:fileId',
    loadComponent: () => import('./source-code/source-code.component')
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowSolutionsRoutingModule { }
