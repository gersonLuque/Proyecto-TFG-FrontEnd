import { Routes } from '@angular/router';

export const routes: Routes = [
  {
   path: '',
    loadChildren: () => import('./feature/feature.module').then(f => f.FeatureModule)
  }
];
