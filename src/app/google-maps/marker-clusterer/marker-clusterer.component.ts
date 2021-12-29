import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marker-clusterer',
  templateUrl: './marker-clusterer.component.html',
  styleUrls: ['./marker-clusterer.component.scss']
})
export class MarkerClustererComponent implements OnInit {
  vehicles: Vehicle[];
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  markers: google.maps.Marker[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.vehicleService.getVehicles()
      .subscribe((response) => {
        this.vehicles = response.objects;
        this.initMapAndMarkers();
      });
  }

  initMapAndMarkers() {
    let loader = new Loader({
      apiKey: environment.apiKey
    });

    loader.load().then(() => {
      this.map = this.createMap();
      this.infoWindow = this.createPopup();
      this.markers = this.createMarkers();

      new MarkerClusterer({ markers: this.markers, map: this.map });
    });
  }

  createMap() {
    return new google.maps.Map(document.getElementById("map"), {
      center: { lat: 53.23334, lng: 15.78333 },
      zoom: 5
    })
  }

  createPopup() {
    return new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
  }

  createMarkers() {
    return this.vehicles.map((vehicle, i) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(vehicle.location.latitude, vehicle.location.longitude)
      });

      marker.addListener("click", () => {
        this.infoWindow.open(this.map, marker);
      });

      return marker;
    });
  }
}