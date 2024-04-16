import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { UserGuard } from './guard/user.guard';
import { UserComponent } from './modules/user/user.component';
import { SubscriptionsComponent } from './modules/subscriptions/subscriptions.component';
import { ViewUserComponent } from './modules/view-user/view-user.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { WallboardComponent } from './modules/wallboard/wallboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "dashboard", component: DashboardComponent, 
    children: [
      { path: "users", component: UserComponent },
      { path: "addUser", component: AddUserComponent },
      { path: "view-user", component: ViewUserComponent },
      { path: "subscriptions", component: SubscriptionsComponent },
      { path: "wallboard", component: WallboardComponent },

      { path: "profile", component: UpdateProfileComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
