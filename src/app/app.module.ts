import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HeaderComponent } from './header/header/header.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { LandingPageComponent } from './landingPage/landing-page/landing-page.component';
import { FooterComponent } from './footer/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    LandingPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
