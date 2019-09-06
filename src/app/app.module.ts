import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule,MatSidenavModule,MatListModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoadPipe } from './home/load.pipe';

const material = [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule,MatSidenavModule,MatListModule];
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    LoadPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...material,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
