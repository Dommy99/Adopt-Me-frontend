import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginRegisterComponent,
    ImgCarouselComponent,
    HomepageComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginRegisterComponent,
    ImgCarouselComponent,
    HomepageComponent
  ]
})
export class LoginModule { }
