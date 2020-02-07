import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
    SearchStatus,
    SearchManager,
    TableData,
} from '../../models/operations.model';

import { OperationsHttpService } from '../../services/operations-http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent implements OnInit {
  searchStatus: SearchStatus[] = [];
  searchManager: SearchManager[] = [];
  tableData: TableData[] = [];
  searchForm = this.fb.group({
    searchText: ['', Validators.required],
    searchManagerText: ['', Validators.required],
    searchStatusText: ['', Validators.required],
  });

  manager = new FormControl();
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'agent', 'modified', 'cups', 'marketer', 'permanence', 'document', 'name', 'rate_id', 'consumption', 'prlevel_id'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public operationsService: OperationsHttpService, private fb: FormBuilder, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.operationsService.getSearchStatus()
      .subscribe((res: any) => {
        this.searchStatus = res.data.status;
      });

    this.operationsService.getSearchManager()
      .subscribe((res: any) => {
        this.searchManager = res.data.managers;
      });

    this.operationsService.getTableData()
      .subscribe((res: any) => {
        Object.values(res.data.offer_list).map((el: any) => {
          el.permanence = this.datePipe.transform(el.permanence, 'dd/MM/yyyy');
          this.tableData.push(el);
        });
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSearch(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.operationsService.Search(this.searchForm.value.searchText, this.searchForm.value.searchManagerText, this.searchForm.value.searchStatusText)
      .subscribe((res: any) => {
        this.tableData = [];
        Object.values(res.data.offer_list).map((el: any) => {
          el.permanence = this.datePipe.transform(el.permanence, 'dd/MM/yyyy');
          this.tableData.push(el);
        });
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
