import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChetComponent } from './chet/chet.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent ,
  },
  {
    path: 'message',
    component: MessageComponent ,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChetComponent ,
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    component: MainComponent ,
    canActivate: [AuthGuard],
  },
  { path: '**',redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
