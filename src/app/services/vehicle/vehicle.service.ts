import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleResponse } from 'src/app/models/vehicle-response';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  readonly dataUrl = environment.dataUrl;

  getVehicles(): Observable<VehicleResponse> {
    return this.http.get<VehicleResponse>(this.dataUrl);
  }
}
