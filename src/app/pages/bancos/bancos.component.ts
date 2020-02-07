import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BancosService } from '../../services/bancos.service';
import { BankData } from '../../models/bancos.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  bancosForm = this.fb.group({
    busquesda: ['', Validators.required],
    enviados: [Validators.required],
    devueltos: [Validators.required],
    especial: [Validators.required],
    activo: [Validators.required],
    fecha: ['', Validators.required],
    filtrar: [],
    cargo: [Validators.required],
    seleccionar: []
  });
  envidosSelect: [];
  devueltosSelect: [];
  especialSelect: [];
  activoSelect: [];
  filtrarRadio: [];
  seleccionarRadio: [];
  date: any;

  bankData: BankData[] = [];
  tableSouce: MatTableDataSource<BankData>;
  displayedColumns: string[] = [
    'position',
    'document',
    'fullname',
    'count_id',
    'bills',
    'value',
    'date',
    'return_times',
    'bank_id',
    'select'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<BankData>(true, []);

  constructor(
    private fb: FormBuilder,
    public bancosService: BancosService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.bancosService.getEnviados().subscribe((res: any) => {
      this.envidosSelect = res.enviados;
      this.devueltosSelect = res.enviados;
      this.especialSelect = res.enviados;
      this.activoSelect = res.enviados;
    });

    this.bancosService.getFiltrar().subscribe((res: any) => {
      this.filtrarRadio = res.filtrar;
    });

    this.bancosService.getSeleccionar().subscribe((res: any) => {
      this.seleccionarRadio = res.seleccionar;
    });

    this.bancosService.getBank().subscribe((res: any) => {
      let cnt = 0;
      let customerId = 0;
      let id = 0;
      this.bankData = [];
      Object.values(res.data.data).map((el: any) => {
        cnt++;
        customerId = el.customer_id;
        id = el.id;
        this.bankData.push({
          id: el.id,
          position: cnt,
          document: res.data.customers[customerId].document,
          fullname: res.data.customers[customerId].fullname,
          count_id: 'CA ' + el.count_id,
          bills: res.data.bills[id],
          value: el.value,
          date: this.datePipe.transform(el.date, 'dd/MM/yyyy'),
          return_times: el.return_times,
          bank_id: el.bank_id ? 'Si' : 'NO'
        });
      });
      this.tableSouce = new MatTableDataSource(this.bankData);
      this.tableSouce.paginator = this.paginator;
      this.tableSouce.sort = this.sort;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableSouce.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableSouce.data.forEach(row => this.selection.select(row));
  }

  onBuscar() {
    if (this.bancosForm.invalid) {
      return;
    }
    const selectedId: string[] = [];
    const charges: any[] = [];

    this.selection.selected.map((el: any) => {
      selectedId.push(el.id);
    });

    this.bankData.map((el: any) => {
      const element = {};
      if (selectedId.includes(el.id)) {
        element[el.id] = 1;
      } else {
        element[el.id] = 0;
      }
      charges.push(element);
    });

    const sendData = {
      name: this.bancosForm.value.busquesda,
      sent: this.bancosForm.value.enviados,
      returned: this.bancosForm.value.devueltos,
      special: this.bancosForm.value.especial,
      active: this.bancosForm.value.activo,
      search_date: this.datePipe.transform(this.bancosForm.value.fecha, 'dd/MM/yyyy'),
      bank_filter: this.bancosForm.value.filtrar,
      date: this.datePipe.transform(this.bancosForm.value.cargo, 'dd/MM/yyyy'),
      bank: this.bancosForm.value.seleccionar,
      Charges: charges
    };
    this.bancosService.postBuscar(sendData).subscribe((res: any) => {
      console.log(res);
    });
  }
}
