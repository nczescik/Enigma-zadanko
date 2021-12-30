import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Vehicle } from 'src/app/models/vehicle';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marker-clusterer',
  templateUrl: './marker-clusterer.component.html',
  styleUrls: ['./marker-clusterer.component.scss']
})
export class MarkerClustererComponent implements OnInit, OnChanges {
  @Input() vehiclesToDisplay: Vehicle[];

  map: google.maps.Map;
  markerClusterer: MarkerClusterer;

  constructor() { }

  ngOnInit(): void {
    this.initMapAndMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['vehiclesToDisplay'].isFirstChange()) {
      this.reloadMarkers();
    }
  }

  initMapAndMarkers() {
    let loader = new Loader({
      apiKey: environment.apiKey
    });

    loader.load().then(() => {
      this.map = this.createMap();
      let markers = this.createMarkers();

      this.markerClusterer = new MarkerClusterer({ markers, map: this.map });
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
    return this.vehiclesToDisplay.map((vehicle, i) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(vehicle.location.latitude, vehicle.location.longitude)
      });

      marker.addListener("click", () => {
        this.createPopup().open(this.map, marker);
      });

      return marker;
    });
  }

  reloadMarkers() {
    this.markerClusterer.clearMarkers();
    this.markerClusterer.addMarkers(this.createMarkers());
  }
}