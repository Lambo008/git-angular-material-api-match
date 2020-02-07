import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtrService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(environment.apiUrl + '/facturacion/atr');
  }

  postPotencia(potenciaValue: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'save');
    Object.values(potenciaValue).map(element => {
      Object.keys(element).map(key => {
        formData.append('EnergyPrice[' + element['rate_id'] + '][' + key + ']', element[key]);
      });
    });
    return this.http.post(environment.apiUrl + '/facturacion/atr/potencia', formData);
  }

  postAtr(atrValue: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'save');
    Object.values(atrValue).map(element => {
      Object.keys(element).map(key => {
        formData.append('EnergyPrice[' + element['rate_id'] + '][' + key + ']', element[key]);
      });
    });
    return this.http.post(environment.apiUrl + '/facturacion/atr/atr', formData);
  }

  postBase(baseValue: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'save');
    Object.values(baseValue).map(element => {
      Object.keys(element).map(key => {
        formData.append('EnergyPrice[' + element['rate_id'] + '][' + key + ']', element[key]);
      });
    });
    return this.http.post(environment.apiUrl + '/facturacion/atr/base', formData);
  }
}
