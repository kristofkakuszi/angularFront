import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AuthGuard } from '../app/utility/app.guard';

const routes: Routes = [
  /*
  { path: '', loadChildren: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadChildren: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadChildren: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: 'landing', loadChildren: () => import('./landing/landing.component').then(m => m.LandingComponent), canActivate: [AuthGuard] }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
