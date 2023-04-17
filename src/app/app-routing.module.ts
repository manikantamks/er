import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { FindexpertComponent } from './findexpert/findexpert.component';
import { FollowingComponent } from './following/following.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PostqueryComponent } from './postquery/postquery.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', redirectTo : 'home',pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:'profile',component: ProfileComponent},
  {path:'following',component: FollowingComponent},
  {path:'recommended',component: RecommendedComponent},
  {path:'find-expert',component: FindexpertComponent},
  {path:'post-query',component: PostqueryComponent},
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"logout",component:LogoutComponent},
  {path:"**",component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
