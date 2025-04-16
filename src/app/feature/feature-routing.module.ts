import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavLayoutComponent} from '../shared/components/nav-layout/nav-layout.component';
import {isLoginGuard} from '@core/guards/is-login.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full'
  }, // Redirige a /auth/login por defecto
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(f => f.AuthModule)
  },
  {
    path: 'home',
    component: NavLayoutComponent,
    canMatch: [isLoginGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(f => f.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {
}
