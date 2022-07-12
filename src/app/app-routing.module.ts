import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('../app/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "main",
    loadChildren: () => import('../app/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
