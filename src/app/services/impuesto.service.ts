import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  constructor(private http: HttpClient) { }

  postBuscar(date: any, liquidable: boolean, calcular: boolean, fichero: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('from', date.begin);
    formData.append('until', date.end);
    formData.append('liquidable', liquidable ? '1' : '0');
    formData.append('imp_elect', calcular ? '1' : '0');
    formData.append('fichero', fichero ? '1' : '0');
    return this.http.post(environment.apiUrl + '/contabilidad/impuesto', formData);
  }
}
