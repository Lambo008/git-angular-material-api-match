import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormatData } from '../../models/format.model';

import { FormatHttpService } from '../../services/format-http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {
  tableData: FormatData[] = [];
  displayedColumns: string[] = ['until', 'from', 'energyp1', 'energyp2', 'energyp3', 'energyp4', 'energyp5', 'energyp6'];
  consumoTable: MatTableDataSource<FormatData>;
  reactivaTable: MatTableDataSource<FormatData>;
  maximetrosTable: MatTableDataSource<FormatData>;

  @ViewChild('consumoTablePaginator', {static: true}) consumopaginator: MatPaginator;
  @ViewChild('reactivaTablePaginator', {static: true}) reactivapaginator: MatPaginator;
  @ViewChild('maximetrosTablePaginator', {static: true}) maximetrospaginator: MatPaginator;
  @ViewChild('consumoTableSort', {static: true}) consumosort: MatSort;
  @ViewChild('reactivaTableSort', {static: true}) reactivasort: MatSort;
  @ViewChild('maximetroTableSort', {static: true}) maximetrosort: MatSort;

  constructor(public formatService: FormatHttpService, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  onRequest(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.formatService.Request(form.value.format)
      .subscribe((res: any) => {
        this.tableData = [];
        Object.values(res.data.periods).map((el: any) => {
          this.tableData.push({
            until: this.datePipe.transform(el.until, 'dd/MM/yyyy'),
            from: this.datePipe.transform(el.from, 'dd/MM/yyyy'),
            energyp1: el.energyp1,
            energyp2: el.energyp2,
            energyp3: el.energyp3,
            energyp4: el.energyp4,
            energyp5: el.energyp5,
            energyp6: el.energyp6,
          });
        });
        this.consumoTable = new MatTableDataSource(this.tableData);
        this.consumoTable.paginator = this.consumopaginator;
        this.consumoTable.sort = this.consumosort;
        this.reactivaTable = new MatTableDataSource(this.tableData);
        this.reactivaTable.paginator = this.reactivapaginator;
        this.reactivaTable.sort = this.reactivasort;
        this.maximetrosTable = new MatTableDataSource(this.tableData);
        this.maximetrosTable.paginator = this.maximetrospaginator;
        this.maximetrosTable.sort = this.maximetrosort;
      });
  }

}
