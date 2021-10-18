import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { DiariosComponent } from './diarios/diarios.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import {
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToDiarios = () => redirectLoggedInTo(['diarios']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Route[] = [
  {
    path: '', 
    component:HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent,
    ...canActivate(redirectLoggedInToDiarios),
  },
  {
    path: 'signup',
    component: SingupComponent,
    ...canActivate(redirectLoggedInToDiarios),
  },
  {
    path: 'diarios',
    component: DiariosComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
