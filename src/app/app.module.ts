import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';           //posthoz kell

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
//import { initializeKeycloak } from '../app/utility/app.init'

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LandingComponent } from './landing';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    AuthComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //KeycloakAngularModule
  ],
  providers: [
    HeroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
