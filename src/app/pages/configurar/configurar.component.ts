import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigurarService } from '../../services/configurar.service';

import {
  BankData,
  ConfigurarData,
} from '../../models/configurar.model';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {
  configurarForm = this.fb.group({
    name: ['', Validators.required],
    iban: ['', Validators.required],
    bic: ['', Validators.required],
    ccontable: ['', Validators.required],
    bank: ['', Validators.required]
  });

  bankData: BankData[] = [];

  configurarData: ConfigurarData[] = [];
  tableSource: MatTableDataSource<ConfigurarData>;
  displayedColumns: string[] = [
    'id', 'name', 'iban', 'bic', 'ccontable', 'default', 'banks', 'editar'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    public configurarService: ConfigurarService
  ) {}

  ngOnInit() {
    this.configurarService.getConfigurar().subscribe((res: any) => {
      Object.keys(res.data.banks).map(key => {
        this.bankData.push({
          id: key,
          value: res.data.banks[key]
        });
      });
      Object.keys(res.data.configs).map(key => {
        this.configurarData.push({
          id: key,
          name: res.data.configs[key].name,
          iban: res.data.configs[key].iban,
          bic: res.data.configs[key].bic,
          ccontable: res.data.configs[key].ccontable,
          default: res.data.configs[key].default,
          banks: res.data.configs[key].banks[key],
          editar: 'Editar',
        });
      });
      this.tableSource = new MatTableDataSource(this.configurarData);
      this.tableSource.paginator = this.paginator;
      this.tableSource.sort = this.sort;
    });
  }

  onGuardar() {
    if (this.configurarForm.invalid) {
      return;
    }
    this.configurarService.postConfigurar(
      this.configurarForm.value.name,
      this.configurarForm.value.iban,
      this.configurarForm.value.bic,
      this.configurarForm.value.ccontable,
      this.configurarForm.value.bank,
    ) .subscribe((res: any) => {
        console.log(res);
      });
  }
}
