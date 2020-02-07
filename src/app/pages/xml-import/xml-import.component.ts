import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-xml-import',
  templateUrl: './xml-import.component.html',
  styleUrls: ['./xml-import.component.css']
})
export class XmlImportComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: environment.apiUrl + '/activations/xml-reader/next',
    itemAlias: 'file'
  });

  response: {
    color: any;
    message: any;
  };

  constructor() {}

  ngOnInit() {
    this.response = {
      color: '',
      message: '',
    };
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if (JSON.parse(status).OK) {
        this.response = {
          color: 'green',
          message: JSON.parse(status).OK
        };
      } else if (JSON.parse(status).KO) {
        this.response = {
          color: 'green',
          message: JSON.parse(status).KO
        };
      }
    };
  }

  onReset() {
    this.response = {
      color: '',
      message: ''
    };
  }
}
