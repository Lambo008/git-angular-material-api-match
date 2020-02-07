import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-formateo',
  templateUrl: './formateo.component.html',
  styleUrls: ['./formateo.component.css']
})
export class FormateoComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: environment.apiUrl + '/contabilidad/formateo-viesgo',
    itemAlias: 'file'
  });

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
  }

}
