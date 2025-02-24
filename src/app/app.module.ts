import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedComponentsModule } from "./shared/shared.components.module";
import { HomeComponentsModule } from './core/module/home-components.module';
import { AuthInterceptor } from './core/helpers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent
  ],


  imports: [
    HomeComponentsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
