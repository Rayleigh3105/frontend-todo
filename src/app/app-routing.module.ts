import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'login',
  },
  {
    path      : 'dashboard',
    component : DashboardComponent,
    canActivate: [AuthGuard]
  },
    {
        path      : 'login',
        component : LoginComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
