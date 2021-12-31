import { Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Status, Type, Vehicle } from 'src/app/models/vehicle';
import { environment } from 'src/environments/environment';
import { faCar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'app-marker-clusterer',
  templateUrl: './marker-clusterer.component.html',
  styleUrls: ['./marker-clusterer.component.scss']
})
export class MarkerClustererComponent implements OnInit, OnChanges {
  @Input() 
  vehiclesToDisplay: Vehicle[];

  @Output() 
  emitSelectedVehicle = new EventEmitter<Vehicle>()

  map: google.maps.Map;
  markerClusterer: MarkerClusterer;


  constructor(private _ngZone: NgZone) { 
    window["angularComponentRef"] = { component: this, zone: this._ngZone };
  }

  ngOnInit(): void {
    this.initMapAndMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['vehiclesToDisplay'].isFirstChange()) {
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

  createPopup(vehicle) {
    return new google.maps.InfoWindow({
      content: `<button onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.emitVehicleDetails('` + vehicle.id + `')});">Details ...</button>`,
      disableAutoPan: true,
    });
  }

  createMarkers() {
    return this.vehiclesToDisplay.map((vehicle) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(vehicle.location.latitude, vehicle.location.longitude),
        icon: this.createSymbol(vehicle),
      });

      marker.addListener("click", () => {
        let infoWindow = this.createPopup(vehicle);
        infoWindow.open(this.map, marker);
      });

      return marker;
    });
  }

  createSymbol(vehicle) {
    return {
      path: (vehicle.type == Type.CAR ? faCar.icon[4] : faTruck.icon[4]) as string,
      fillColor: vehicle.status == Status.AVAILABLE ? 'green' : 'red',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 0.075,
    }
  }

  reloadMarkers() {
    this.markerClusterer.clearMarkers();
    this.markerClusterer.addMarkers(this.createMarkers());
  }
  
  emitVehicleDetails(id) {
    let selectedVehicle = this.vehiclesToDisplay
      .find(v => v.id == id);
    this.emitSelectedVehicle.emit(selectedVehicle);
  }
}