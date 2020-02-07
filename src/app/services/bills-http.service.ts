import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Type, BillData } from '../models/bills.model';

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillsHttpService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(environment.apiUrl + '/activations/bills/type');
  }

  Send(document: string, cups: string, date: any, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'generate');
    formData.append('document', document);
    formData.append('cups', cups);
    formData.append('from', date.begin);
    formData.append('until', date.end);
    formData.append('type', type);
    return this.http.post(environment.apiUrl + '/activations/bills/bill', formData);
  }
}
