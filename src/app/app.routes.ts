import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbaordComponent } from './user/dashbaord/dashbaord.component';
import { AddExpenseComponent } from './user/add-expense/add-expense.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth/auth.service';
import { LoginauthService } from './auth/loginauth.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginauthService] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard/:id',
    component: DashbaordComponent,
    canActivate: [AuthService],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard/:id' },
];
