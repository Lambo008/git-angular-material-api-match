import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TasaService } from '../../services/tasa.service';
import { MatSort } from '@angular/material/sort';
import {
  SummaryType,
  TotalType,
  TotalType1,
  TotalType2
} from '../../models/tasa.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
@Component({
  selector: 'app-tasa',
  templateUrl: './tasa.component.html',
  styleUrls: ['./tasa.component.css']
})
export class TasaComponent implements OnInit {
  tasaForm = this.fb.group({
    postcode: ['', Validators.required],
    fecha: ['', Validators.required],
    summary: true,
  });
  isChecked = false;
  isuncheckedState1 = true;
  isuncheckedState2 = true;

  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('scheduledOrdersPaginator1', {static: true}) paginator1: MatPaginator;
  @ViewChild('scheduledOrdersPaginator2', {static: true}) paginator2: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // Summary Table
  summaryData: SummaryType[] = [];
  summaryDisplayedColumns: string[] = ['date', 'aus', 'atr'];
  summaryTable: MatTableDataSource<SummaryType>;

  // Total Table
  totalAusValue = 0;
  totalAtrValue = 0;
  totalRawData: TotalType[] = [];
  totalData: any[] = [];
  totalInputColumns: string[] = ['TOTAL', 'TASA'];
  totalDisplayColumns: string[] = [];

  //unchecked table1 : the length of rate < 7 (default)
  displayedColumns: string[] = ['Factura', 'CUPS', 'Tarifa', 'CIF', 'Nombre', 'Fecha', 'Consumo', 'Precio', 'ATR', 'Total', 'Total_ATR', 'Consumo1', 'Precio1', 'ATR1', 'Total1', 'Total_ATR1', 'Consumo2', 'Precio2', 'ATR2', 'Total2', 'Total_ATR2', 'Aiq', 'Otros', 'Subt', 'Impuestos', 'Total3', 'CofFac'];
  totalRawData1: TotalType1[] = [];
  uncheckedTable: MatTableDataSource<TotalType1>;

  //unchecked table2 : the length of rate >= 7 
  displayedColumns2: string[] = ['Factura', 'CUPS', 'Tarifa', 'CIF', 'Nombre', 'Fecha', 'Consumo', 'Precio', 'ATR', 'Total', 'Total_ATR', 'Consumo1', 'Precio1', 'ATR1', 'Total1', 'Total_ATR1', 'Consumo2', 'Precio2', 'ATR2', 'Total2', 'Total_ATR2', 'Consumo3', 'Precio3', 'ATR3', 'Total3', 'Total_ATR3', 'Consumo4', 'Precio4', 'ATR4', 'Total4', 'Total_ATR4', 'Consumo5', 'Precio5', 'ATR5', 'Total5', 'Total_ATR5', 'Aiq', 'Otros', 'Subt', 'Impuestos', 'Total6', 'CofFac'];
  totalRawData2: TotalType2[] = [];
  uncheckedTable2: MatTableDataSource<TotalType2>;

  constructor(
    private fb: FormBuilder,
    public tasaService: TasaService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
  }

  onBuscar() {
    if (this.tasaForm.invalid) {
      return;
    }
    this.tasaService.postBuscar(
      this.tasaForm.value.postcode,
      this.datePipe.transform(this.tasaForm.value.fecha.begin, 'dd/MM/yyyy'),
      this.datePipe.transform(this.tasaForm.value.fecha.end, 'dd/MM/yyyy'),
      this.tasaForm.value.summary ? 1 : 0,
    ) .subscribe((res: any) => {
      if (res.check) {
        this.isChecked = true;
        this.isuncheckedState1 = true;
        this.isuncheckedState2 = true;
        this.summaryData = [];
        this.totalAusValue = 0;
        this.totalAtrValue = 0;
        console.log(res);
        Object.keys(res.summary).map(year => {
          Object.keys(res.summary[year]).map(month => {
            this.totalAusValue += res.summary[year][month].aus;
            this.totalAtrValue += res.summary[year][month].atr;
            this.summaryData.push({
              date: year + '/' + month,
              aus: res.summary[year][month].aus.toFixed(2),
              atr: res.summary[year][month].atr.toFixed(2),
            });
          });
        }); 
        this.summaryTable = new MatTableDataSource(this.summaryData);
        this.totalRawData = [];
        this.totalRawData.push({
          TOTAL: String(this.totalAusValue.toFixed(2)),
          TASA: String((this.totalAusValue * res.tasa_municipal).toFixed(2)),
        });
        this.totalRawData.push({
          TOTAL: String(this.totalAtrValue.toFixed(2)),
          TASA: String((this.totalAtrValue * res.tasa_municipal).toFixed(2)),
        });
        this.totalDisplayColumns = ['0'].concat(this.totalRawData.map(x => x.TOTAL.toString()));
        this.totalData = this.totalInputColumns.map(x => this.formatInputRow(x));
      } else {// this shows table when checkbox is unchecked
        this.totalRawData1 = [];//This is data input when length of rate is under 7
        this.totalRawData2 = [];//This is data input when length of rate is above 7
        this.isChecked = false; // when checkbox is unchecked
        console.log(res);
        let i = 0;
        let lenghtOfrate = res.rates.length; // length of rate
        console.log(lenghtOfrate);
        if(lenghtOfrate < 7){ // when length of rate is under 7
          this.isuncheckedState1 = false;
          this.isuncheckedState2 = true;
          Object.keys(res.cups_bills).map(element => {
              this.totalRawData1.push(
                {
                  Factura: res.cups_bills[element].code,
                  CUPS: res.cups_bills[element].cups,
                  Tarifa: res.cups_bills[element].rate_name,
                  CIF: res.cups_bills[element].document ,
                  Nombre:res.cups_bills[element].fullname,
                  Fecha:this.datePipe.transform(res.cups_bills[element].created, 'dd/MM/yyyy'),  
                  // period 1
                  Consumo:res.cups_bills[element].energyp1,
                  Precio:res.cups_bills[element].energy_prp1,
                  ATR:res.cups_bills[element].atr1,
                  Total:res.cups_bills[element].total1,
                  Total_ATR:res.cups_bills[element].tot_atr1,
                  // period 2
                  Consumo1:res.cups_bills[element].energyp2,
                  Precio1:res.cups_bills[element].energy_prp2,
                  ATR1:res.cups_bills[element].atr2,
                  Total1:res.cups_bills[element].total2,
                  Total_ATR1:res.cups_bills[element].tot_atr2,

                  // period 3
                  Consumo2:res.cups_bills[element].energyp3,
                  Precio2:res.cups_bills[element].energy_prp3,
                  ATR2:res.cups_bills[element].atr3,
                  Total2:res.cups_bills[element].total3,
                  Total_ATR2:res.cups_bills[element].tot_atr3,

                  Aiq:res.cups_bills[element].alq_equip + res.cups_bills[element].telem_value,
                  Otros: res.cups_bills[element].others,
                  Subt:res.cups_bills[element].base,
                  Impuestos:res.cups_bills[element].iva,
                  Total3:res.cups_bills[element].total,
                  CofFac:res.cups_bills[element].bill_code
                }
              );
          })
          this.uncheckedTable = new MatTableDataSource(this.totalRawData1);
          this.uncheckedTable.paginator = this.paginator1;
        }else{ // when length of rate is above 7
          this.isuncheckedState1 = true;
          this.isuncheckedState2 = false;
          Object.keys(res.cups_bills).map(element => {
              this.totalRawData2.push(
                {
                  Factura: res.cups_bills[element].code,
                  CUPS: res.cups_bills[element].cups,
                  Tarifa: res.cups_bills[element].rate_name,
                  CIF: res.cups_bills[element].document ,
                  Nombre:res.cups_bills[element].fullname,
                  Fecha:this.datePipe.transform(res.cups_bills[element].created, 'dd/MM/yyyy'),
                  // period 1
                  Consumo:res.cups_bills[element].energyp1,
                  Precio:res.cups_bills[element].energy_prp1,
                  ATR:res.cups_bills[element].atr1,
                  Total:res.cups_bills[element].total1,
                  Total_ATR:res.cups_bills[element].tot_atr1,
                  // period 2
                  Consumo1:res.cups_bills[element].energyp2,
                  Precio1:res.cups_bills[element].energy_prp2,
                  ATR1:res.cups_bills[element].atr2,
                  Total1:res.cups_bills[element].total2,
                  Total_ATR1:res.cups_bills[element].tot_atr2,
                  // period 3
                  Consumo2:res.cups_bills[element].energyp3,
                  Precio2:res.cups_bills[element].energy_prp3,
                  ATR2:res.cups_bills[element].atr3,
                  Total2:res.cups_bills[element].total3,
                  Total_ATR2:res.cups_bills[element].tot_atr3,
                  // period 4
                  Consumo3:res.cups_bills[element].energyp4,
                  Precio3:res.cups_bills[element].energy_prp4,
                  ATR3:res.cups_bills[element].atr4,
                  Total3:res.cups_bills[element].total4,
                  Total_ATR3:res.cups_bills[element].tot_atr4,
                  // period 5
                  Consumo4:res.cups_bills[element].energyp5,
                  Precio4:res.cups_bills[element].energy_prp5,
                  ATR4:res.cups_bills[element].atr5,
                  Total4:res.cups_bills[element].total5,
                  Total_ATR4:res.cups_bills[element].tot_atr5,
                  //period 6
                  Consumo5:res.cups_bills[element].energyp6,
                  Precio5:res.cups_bills[element].energy_prp6,
                  ATR5:res.cups_bills[element].atr6,
                  Total5:res.cups_bills[element].total6,
                  Total_ATR5:res.cups_bills[element].tot_atr6,
                                 
                  Aiq:res.cups_bills[element].alq_equip + res.cups_bills[element].telem_value,
                  Otros: res.cups_bills[element].others,
                  Subt:res.cups_bills[element].base,
                  Impuestos:res.cups_bills[element].iva,
                  Total6:res.cups_bills[element].total,
                  CofFac:res.cups_bills[element].bill_code
                }
              );
          })
          this.uncheckedTable2 = new MatTableDataSource(this.totalRawData2);
          this.uncheckedTable2.paginator = this.paginator2;
        }      
      }
      
    });
  }
  formatInputRow(row) {
    const output = {};
    output[0] = row;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.totalRawData.length; ++i) {
      output[this.totalRawData[i].TOTAL] = this.totalRawData[i][row];
    }
    return output;
  }

}
