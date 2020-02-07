import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor(private http: HttpClient) { }

  getPrices(): Observable<any> {
    return this.http.get(environment.apiUrl + '/facturacion/consumo/prices');
  }

  postBusquesda(price: string) {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('type_id', price);
    return this.http.post(environment.apiUrl + '/facturacion/consumo/prices', formData);
  }

  postInsert(form: any) {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'insert');
    formData.append('new_type', form.value.insert);
    formData.append('new_name', form.value.nombre);
    return this.http.post(environment.apiUrl + '/facturacion/consumo/insert', formData);
  }
}
