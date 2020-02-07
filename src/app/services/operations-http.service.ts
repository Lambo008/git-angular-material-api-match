import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
    SearchStatus,
    SearchManager,
    TableData,
} from '../models/operations.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsHttpService {

  constructor(private http: HttpClient) { }

  getSearchStatus(): Observable<SearchStatus[]> {
    return this.http.get<SearchStatus[]>(environment.apiUrl + '/activations/operations/status');
  }

  getSearchManager(): Observable<SearchManager[]> {
    return this.http.get<SearchManager[]>(environment.apiUrl + '/activations/operations/manager');
  }

  getTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(environment.apiUrl + '/activations/operations/data');
  }

  Search(search: string, manager: string, status: string) {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'search');
    formData.append('name', search);
    formData.append('user_id', manager);
    formData.append('state_id', status);
    return this.http.post(environment.apiUrl + '/activations/operations/search', formData);
  }

}
