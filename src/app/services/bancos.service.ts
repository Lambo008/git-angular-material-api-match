import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(private http: HttpClient) { }

  getEnviados(): Observable<any> {
    return this.http.get(environment.apiUrl + '/contabilidad/bancos/enviados');
  }

  getFiltrar(): Observable<any> {
    return this.http.get(environment.apiUrl + '/contabilidad/bancos/filtrar');
  }

  getSeleccionar(): Observable<any> {
    return this.http.get(environment.apiUrl + '/contabilidad/bancos/seleccionar');
  }

  getBank(): Observable<any> {
    return this.http.get(environment.apiUrl + '/contabilidad/bancos/bank');
  }

  postBuscar(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('name', data.name);
    formData.append('sent', data.sent);
    formData.append('returned', data.returned);
    formData.append('special', data.special);
    formData.append('active', data.active);
    formData.append('search_date', data.search_date);
    formData.append('bank_filter', data.bank_filter);
    formData.append('date', data.date);
    formData.append('bank', data.bank);
    formData.append('Charges', JSON.stringify(data.Charges));
    return this.http.post(environment.apiUrl + '/contabilidad/bancos/bank', formData);
  }
}
