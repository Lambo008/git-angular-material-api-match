import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiamaconService {

  constructor(private http: HttpClient) { }

  postDiamacon(date: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'generate');
    formData.append('from', date.begin);
    formData.append('until', date.end);
    return this.http.post(environment.apiUrl + '/contabilidad/diamacon', formData);
  }
}
