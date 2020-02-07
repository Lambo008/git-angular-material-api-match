import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurarService {

  constructor(private http: HttpClient) { }

  getConfigurar(): Observable<any> {
    return this.http.get(environment.apiUrl + '/contabilidad/configurar');
  }

  postConfigurar(name: string, iban: string, bic: string, ccontable: string, bank: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'save');
    formData.append('name', name);
    formData.append('iban', iban);
    formData.append('bic', bic);
    formData.append('ccontable', ccontable);
    formData.append('banks', bank);
    return this.http.post(environment.apiUrl + '/contabilidad/configurar', formData);
  }
}
