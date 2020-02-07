import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subida',
  templateUrl: './subida.component.html',
  styleUrls: ['./subida.component.css']
})
export class SubidaComponent implements OnInit {
  public uploader1: FileUploader = new FileUploader({
    url: environment.apiUrl + '/contabilidad/subida/archivo',
    itemAlias: 'file'
  });

  public uploader2: FileUploader = new FileUploader({
    url: environment.apiUrl + '/contabilidad/subida/fichero',
    itemAlias: 'file'
  });

  constructor() { }

  ngOnInit() {
    this.uploader1.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader2.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
  }

}
