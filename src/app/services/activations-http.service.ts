import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivationsHttpService {

  constructor(private http: HttpClient) { }

  Sps(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'sips');
    formData.append('cups', data.cups);
    formData.append('all_lects', data.all_lects);
    formData.append('cnmc', data.cnmc);
    formData.append('powerp1', data.powerp1);
    formData.append('powerp2', data.powerp2);
    formData.append('powerp3', data.powerp3);
    formData.append('powerp4', data.powerp4);
    formData.append('powerp5', data.powerp5);
    formData.append('powerp6', data.powerp6);
    formData.append('energy_prp1', data.energy_prp1);
    formData.append('energy_prp2', data.energy_prp2);
    formData.append('energy_prp3', data.energy_prp3);
    formData.append('energy_prp4', data.energy_prp4);
    formData.append('energy_prp5', data.energy_prp5);
    formData.append('energy_prp6', data.energy_prp6);
    formData.append('alq_diario', data.alq_diario);
    formData.append('react_sips', data.react_sips);
    formData.append('incremento', data.incremento);
    return this.http.post(environment.apiUrl + '/activations/activation/sps', formData);
  }

  Concert(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('_method', 'POST');
    formData.append('action', 'concert');
    formData.append('cups', data.cups);
    formData.append('all_lects', data.all_lects);
    formData.append('cnmc', data.cnmc);
    formData.append('powerp1', data.powerp1);
    formData.append('powerp2', data.powerp2);
    formData.append('powerp3', data.powerp3);
    formData.append('powerp4', data.powerp4);
    formData.append('powerp5', data.powerp5);
    formData.append('powerp6', data.powerp6);
    formData.append('energy_prp1', data.energy_prp1);
    formData.append('energy_prp2', data.energy_prp2);
    formData.append('energy_prp3', data.energy_prp3);
    formData.append('energy_prp4', data.energy_prp4);
    formData.append('energy_prp5', data.energy_prp5);
    formData.append('energy_prp6', data.energy_prp6);
    formData.append('alq_diario', data.alq_diario);
    formData.append('react_sips', data.react_sips);
    formData.append('incremento', data.incremento);
    return this.http.post(environment.apiUrl + '/activations/activation/concert', formData);
  }
}
