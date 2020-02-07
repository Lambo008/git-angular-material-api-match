import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postBuscar(clients: string): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'find');
    formData.append('customer_name', clients);
    return this.http.post(environment.apiUrl + '/facturacion/administraciones-face', formData);
  }

  getFace(): Observable<any> {
    return this.http.get(environment.apiUrl + '/facturacion/administraciones-face');
  }

  postDelete(id: any): Observable<any> {
    const formData = new FormData();
    formData.append('delete_id', id);
    return this.http.post(environment.apiUrl + '/facturacion/administraciones-face/delete', formData);
  }
}
