import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkerClustererComponent } from './google-maps/marker-clusterer/marker-clusterer.component';
import { FiltersComponent } from './google-maps/filters/filters.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehicleDetailsComponent } from './google-maps/vehicle-details/vehicle-details.component'

@NgModule({
  declarations: [
    AppComponent,
    MarkerClustererComponent,
    FiltersComponent,
    GoogleMapsComponent,
    VehicleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
