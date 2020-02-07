import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  DayType,
  LooseData,
} from '../models/perdidas.model';

@Injectable({
  providedIn: 'root'
})
export class PerdidasService {

  constructor(private http: HttpClient) { }

  getDay(): Observable<any> {
    return this.http.get(environment.apiUrl + '/facturacion/perdidas/date');
  }

  getLoose(): Observable<any> {
    return this.http.get(environment.apiUrl + '/facturacion/perdidas/loose');
  }

  getDateLoose(year: string, month: string): Observable<any> {
    const timestamp = Date.now();
    return this.http.get(environment.apiUrl + '/facturacion/perdidas/dateloose', {
      params: {
        mes: year,
        ano: month,
        _: String(timestamp)
      }
    });
  }

  postGuardar(formValue: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'save');
    Object.values(formValue).map(element => {
      Object.keys(element).map(key => {
        formData.append('EnergyPrice[' + element['rate_id'] + '][' + key + ']', element[key]);
      });
    });
    return this.http.post(environment.apiUrl + '/facturacion/perdidas/guardar', formData);
  }
}
