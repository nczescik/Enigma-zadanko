import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle/vehicle.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  allVehicles: Vehicle[];
  vehiclesToDisplay: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles()
      .subscribe((response) => {
        this.allVehicles = response.objects;
        this.vehiclesToDisplay = this.allVehicles;
      });
  }

  filter(carsToDisplay){
    this.vehiclesToDisplay = carsToDisplay;
  }
}
