import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  Type,
  BillData,
} from '../../models/bills.model';

import { BillsHttpService } from '../../services/bills-http.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  billForm = this.fb.group({
    document: ['', Validators.required],
    cups: ['', Validators.required],
    date: ['', Validators.required],
    type: ['', Validators.required],
  });
  types: Type[] = [];
  tableData: BillData[] = [];

  displayedColumns: string[] = ['code', 'cups_id', 'cups', 'customer_id', 'bcustomer_id', 'ini', 'fin', 'created'];
  dataSource: MatTableDataSource<BillData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public billsService: BillsHttpService, private fb: FormBuilder, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.billsService.getTypes()
      .subscribe((res: any) => {
        this.types = res.data.types;
      });
  }

  onSend(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.billsService.Send(this.billForm.value.document, this.billForm.value.cups, this.billForm.value.date, this.billForm.value.type)
      .subscribe((res: any) => {
        this.tableData = [];
        Object.values(res.data.bills).map((el: any) => {
          this.tableData.push({
            code: el.code,
            cups_id: el.cups_id,
            cups: el.cups,
            customer_id: el.customer_id,
            bcustomer_id: el.bcustomer_id,
            ini: this.datePipe.transform(el.ini, 'dd/MM/yyyy'),
            fin: this.datePipe.transform(el.fin, 'dd/MM/yyyy'),
            created: this.datePipe.transform(el.created, 'dd/MM/yyyy'),
          });
        });
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

}
