import { Component, OnInit, ViewChild} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { TransferenciasService } from '../../services/transferencias.service';
import { TransferData } from '../../models/transfer.model';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {
  transferenciasForm = this.fb.group({
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

  transferData: TransferData[] = [];
  tableSouce: MatTableDataSource<TransferData>;
  displayedColumns: string[] = [
    'position',
    'document',
    'fullname',
    'bank',
    'iban',
    'count_id',
    'bills',
    'value',
    'date',
    'return_times',
    'bank_id',
    'select',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection = new SelectionModel<TransferData>(true, []);

  constructor(
    private fb: FormBuilder,
    public transferenciasService: TransferenciasService,
    private dataPipe: DatePipe,
  ) {}

  ngOnInit() {
    this.transferenciasService.getEnviados().subscribe((res: any) => {
      this.envidosSelect = res.enviados;
      this.devueltosSelect = res.enviados;
      this.especialSelect = res.enviados;
      this.activoSelect = res.enviados;
    });

    this.transferenciasService.getFiltrar().subscribe((res: any) => {
      this.filtrarRadio = res.filtrar;
    });

    this.transferenciasService.getSeleccionar().subscribe((res: any) => {
      this.seleccionarRadio = res.seleccionar;
    });

    this.transferenciasService.getTransfer().subscribe((res: any) => {
      let cnt = 0;
      let customerId = 0;
      let id = 0;
      this.transferData = [];
      Object.values(res.data.data).map((el: any) => {
        cnt ++;
        customerId = el.customer_id;
        id = el.id;
        this.transferData.push({
          id: el.id,
          position: cnt,
          document: res.data.customers[customerId].document,
          fullname: res.data.customers[customerId].fullname,
          bank: res.data.customers[customerId].bank,
          iban: el.iban,
          count_id: 'CA ' + el.count_id,
          bills: res.data.bills[id],
          value: el.value,
          date: this.dataPipe.transform(el.date, 'dd/MM/yyyy'),
          return_times: el.return_times,
          bank_id: el.bank_id ? 'Si' : 'NO'
        });
      });
      this.tableSouce = new MatTableDataSource(this.transferData);
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
    if (this.transferenciasForm.invalid) {
      return;
    }
    const selectedId: string[] = [];
    const charges: any[] = [];

    this.selection.selected.map((el: any) => {
      selectedId.push(el.id);
    });

    this.transferData.map((el: any) => {
      const element = {};
      if (selectedId.includes(el.id)) {
        element[el.id] = 1;
      } else {
        element[el.id] = 0;
      }
      charges.push(element);
    });

    const sendData = {
      name: this.transferenciasForm.value.busquesda,
      sent: this.transferenciasForm.value.enviados,
      returned: this.transferenciasForm.value.devueltos,
      special: this.transferenciasForm.value.especial,
      active: this.transferenciasForm.value.activo,
      search_date: this.dataPipe.transform(this.transferenciasForm.value.fecha, 'dd/MM/yyyy'),
      bank_filter: this.transferenciasForm.value.filtrar,
      date: this.dataPipe.transform(this.transferenciasForm.value.cargo, 'dd/MM/yyyy'),
      bank: this.transferenciasForm.value.seleccionar,
      Charges: charges
    };

    this.transferenciasService.postBuscar(sendData).subscribe((res: any) => {
      console.log(res);
    });
  }
}
