import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportarService {
  constructor(private http: HttpClient) {}

  postSiguiente(codiog: string) {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('code', codiog);
    return this.http.post(environment.apiUrl + '/contabilidad/exportar-clientes', formData);
  }
}
