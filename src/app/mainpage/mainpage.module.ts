import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginImgCarouselComponent } from './login-img-carousel/login-img-carousel.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [LoginImgCarouselComponent],
  imports: [CommonModule, RouterModule, LoginModule],
  exports: [LoginImgCarouselComponent],
})
export class MainpageModule {}
