import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  
  @Input() vehicles: Vehicle[];
  selectedVehicles: Vehicle[];

  @Output() 
  filter: EventEmitter<Vehicle[]> = new EventEmitter();

  ngOnInit(): void {
    this.selectedVehicles = this.vehicles;
  }

  changeFilter(){
    this.filter.emit(this.selectedVehicles);
  }
  
}