import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() selectedVehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
