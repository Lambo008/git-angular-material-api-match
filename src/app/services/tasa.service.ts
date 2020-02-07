import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasaService {
  constructor(private http: HttpClient) {}

  postBuscar(
    postCode: string,
    ini: string,
    fin: string,
    summary: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('postcode', postCode);
    formData.append('ini', ini);
    formData.append('fin', fin);
    formData.append('summary', summary);
    return this.http.post(environment.apiUrl + '/contabilidad/tasa', formData);
  }
}
