import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { MainpageModule } from './mainpage/mainpage.module';
import { LikepageModule } from './likepage/likepage.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LoginModule,
    MainpageModule,
    LikepageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
