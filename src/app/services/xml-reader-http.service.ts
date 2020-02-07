import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XmlReaderHttpService {
  constructor(private http: HttpClient) {}

  onSubmit(file: any) {
    const formData: FormData = new FormData();
    for (let i = 0; i < file.length; i ++) {
      formData.append(i.toString(), file[i], file[i].name);
    }
    return this.http.post(environment.apiUrl + '/activations/xml-reader/next', formData);
  }
}
