import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormatHttpService {

  constructor(private http: HttpClient) { }

  Request(format: string) {
    const request = { format };
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'solicitar');
    formData.append('cups', format);
    return this.http.post(environment.apiUrl + '/activations/format/request', formData);
  }
}
