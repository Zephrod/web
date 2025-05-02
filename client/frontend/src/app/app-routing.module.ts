import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'etudiants',
        loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsModule)
      },
      {
        path: 'enseignants',
        loadChildren: () => import('./enseignants/enseignants.module').then(m => m.EnseignantsModule)
      },
      {
        path: 'examens',
        loadChildren: () => import('./examens/examens.module').then(m => m.ExamensModule)
      },
      {
        path: 'finances',
        loadChildren: () => import('./finances/finances.module').then(m => m.FinancesModule)
      }
    ]
  },
  { path: 'finances', loadChildren: () => import('./finances/finances.module').then(m => m.FinancesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
