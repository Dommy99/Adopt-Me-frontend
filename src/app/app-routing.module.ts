import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './login/homepage/homepage.component';
import { LoginImgCarouselComponent } from './mainpage/login-img-carousel/login-img-carousel.component';
import { UserlikesComponent } from './likepage/userlikes/userlikes.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'login-img-carousel',
    component: LoginImgCarouselComponent
  },
  {
    path: 'userlikes',
    component: UserlikesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
