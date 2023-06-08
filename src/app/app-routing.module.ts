import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './login/homepage/homepage.component';
import { LoginImgCarouselComponent } from './mainpage/login-img-carousel/login-img-carousel.component';
import { UserlikesComponent } from './likepage/userlikes/userlikes.component';
import { AuthGuard } from './authguard.service';
const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login-img-carousel',
    component: LoginImgCarouselComponent,
    canActivate: [AuthGuard] // blocks untill logged in
  },
  {
    path: 'userlikes',
    component: UserlikesComponent,
    canActivate: [AuthGuard] // blocks untill logged in
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
