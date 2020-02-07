import { Component, OnInit } from '@angular/core';
import { ExportarService } from '../../services/exportar.service';


@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {
  codiogInput: string;

  constructor(public exportarService: ExportarService) {}

  ngOnInit() {}

  onSiguiente() {
    if (!this.codiogInput) {
      return;
    }
    this.exportarService.postSiguiente(this.codiogInput)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
