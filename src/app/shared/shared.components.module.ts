import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { NgChartsModule } from 'ng2-charts';
import { NotificationComponent } from './components/notification/notification.component';
import { ScreenLoaderComponent } from './components/screen-loader/screen-loader.component';

@NgModule({
    declarations: [
        NotificationComponent, ScreenLoaderComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        BrowserModule,
        MaterialModule,
        NgChartsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
        RouterModule,
        BrowserModule,
        MaterialModule,
        NgChartsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NotificationComponent, ScreenLoaderComponent,
    ]
})
export class SharedComponentsModule { }
