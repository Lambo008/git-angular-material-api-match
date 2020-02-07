import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import {
  ConcertData,
  DatosData,
  SipsData,
  TitularData,
  EstudioData,
  ResumenData,
} from '../../models/activation.model';
import { ActivationsHttpService } from '../../services/activations-http.service';

@Component({
  selector: 'app-activations',
  templateUrl: './activations.component.html',
  styleUrls: ['./activations.component.css']
})
export class ActivationsComponent implements OnInit {
  activationForm = this.fb.group({
    cups: ['', Validators.required],
    all_lects: ['', Validators.required],
    cnmc: ['', Validators.required],
    powerp1: ['0', Validators.required],
    powerp2: ['0', Validators.required],
    powerp3: ['0', Validators.required],
    powerp4: ['0', Validators.required],
    powerp5: ['0', Validators.required],
    powerp6: ['0', Validators.required],
    energy_prp1: ['0', Validators.required],
    energy_prp2: ['0', Validators.required],
    energy_prp3: ['0', Validators.required],
    energy_prp4: ['0', Validators.required],
    energy_prp5: ['0', Validators.required],
    energy_prp6: ['0', Validators.required],
    alq_diario: ['0', Validators.required],
    react_sips: false,
    incremento: false
  });

  // Sips Table
  rawData: SipsData[] = [];
  sipsData: any[] = [];
  // tslint:disable-next-line: max-line-length
  sipsInputColumns: string[] = ['CUPS', 'Fecha Alta Suministro', 'Fecha ultimo cambio Comercializador', 'Tarifa', 'Tension', 'Potencia contratada P1', 'Potencia contratada P2', 'Potencia contratada P3', 'Potencia contratada P4', 'Potencia contratada P5', 'Potencia contratada P6', 'Potencia maxima BIE', 'Derechos de acceso', 'Derechos de extension', 'Direccion', 'ID Comercializadora', 'Comercializadora'];
  sipsDisplayColumns: string[];

  // Titular Table
  titularRawData: TitularData[] = [];
  titularData: any[] = [];
  // tslint:disable-next-line: max-line-length
  titularInputColumns: string[] = ['Documento', 'Nombre y Apellido', 'Direccion', 'Codigo Postal', 'Telefono'];
  titularDisplayColumns: string[];

  // Estudio Table
  estudioRawData: EstudioData[] = [];
  estudioData: any[] = [];
  // tslint:disable-next-line: max-line-length
  estudioInputColumns: string[] = ['ConsumoAnual', 'Dias de estudio', 'Consumo Per', 'Potencias Opt', 'Precios'];
  estudioDisplayColumns: string[];


  // Datos Table
  datosData: DatosData[] = [];
  // tslint:disable-next-line: max-line-length
  datosDisplayedColumns: string[] = ['fechainiciomesconsumo', 'fechafinmesconsumo', 'diff', 'codigotarifaatr', 'consumoenergiaactivaenwhp1', 'consumoenergiaactivaenwhp2', 'consumoenergiaactivaenwhp3', 'consumoenergiaactivaenwhp4', 'consumoenergiaactivaenwhp5', 'consumoenergiaactivaenwhp6', 'potenciademandadaenwp1', 'potenciademandadaenwp2', 'potenciademandadaenwp3', 'potenciademandadaenwp4', 'potenciademandadaenwp5', 'potenciademandadaenwp6', 'consumoenergiareactivaenvarhp1', 'consumoenergiareactivaenvarhp2', 'consumoenergiareactivaenvarhp3', 'consumoenergiareactivaenvarhp4', 'consumoenergiareactivaenvarhp5', 'consumoenergiareactivaenvarhp6', 'reactiva'];
  datosTable: MatTableDataSource<DatosData>;
  @ViewChild('datosTablePaginator', {static: true}) datosPaginator: MatPaginator;
  @ViewChild('datosTableSort', {static: true}) datosSort: MatSort;

  // Resumen Table
  resumenRawData: ResumenData[] = [];
  resumenData: any[] = [];
  // tslint:disable-next-line: max-line-length
  resumenInputColumns: string[] = ['Diastotales', 'Consumo P1', 'Consumo P2', 'Consumo P3', 'Consumo P4', 'Consumo P5', 'Consumo P6', 'Consumo Total', 'Consumo Medio P1', 'Consumo Medio P2', 'Consumo Medio P3', 'Consumo Medio P4', 'Consumo Medio P5', 'Consumo Medio P6', 'Reactiva Total'];
  resumenDisplayColumns: string[];

  diasTotal = 0;
  cP1 = 0;
  cP2 = 0;
  cP3 = 0;
  cP4 = 0;
  cP5 = 0;
  cP6 = 0;
  cT = 0;
  cmP1 = 0;
  cmP2 = 0;
  cmP3 = 0;
  cmP4 = 0;
  cmP5 = 0;
  cmP6 = 0;
  reTotal = 0;

  spsFlag: boolean;
  concertFlag: boolean;

  // Concert Table
  concertData: ConcertData[] = [];
  // tslint:disable-next-line: max-line-length
  concertDisplayedColumns: string[] = ['base', 'potencia', 'activa', 'reactiva', 'ie', 'otros', 'alquiler', 'alq_diario', 'dias', 'desde', 'hasta'];
  concertTable: MatTableDataSource<ConcertData>;
  @ViewChild('concertTablePaginator', {static: true}) concertPaginator: MatPaginator;
  @ViewChild('concertTableSort', {static: true}) concertSort: MatSort;

  constructor(private fb: FormBuilder, public activationService: ActivationsHttpService, private datePipe: DatePipe) {}

  ngOnInit() {}

  onSps() {
    if (this.activationForm.invalid) {
      return;
    }

    const data = {
      cups: this.activationForm.value.cups,
      all_lects: this.activationForm.value.all_lects,
      cnmc: this.activationForm.value.cnmc,
      powerp1: this.activationForm.value.powerp1,
      powerp2: this.activationForm.value.powerp2,
      powerp3: this.activationForm.value.powerp3,
      powerp4: this.activationForm.value.powerp4,
      powerp5: this.activationForm.value.powerp5,
      powerp6: this.activationForm.value.powerp6,
      energy_prp1: this.activationForm.value.energy_prp1,
      energy_prp2: this.activationForm.value.energy_prp2,
      energy_prp3: this.activationForm.value.energy_prp3,
      energy_prp4: this.activationForm.value.energy_prp4,
      energy_prp5: this.activationForm.value.energy_prp5,
      energy_prp6: this.activationForm.value.energy_prp6,
      alq_diario: this.activationForm.value.alq_diario,
      react_sips: this.activationForm.value.react_sips ? 1 : 0,
      incremento: this.activationForm.value.incremento ? 1 : 0,
    };

    this.activationService.Sps(data)
      .subscribe((res: any) => {

        this.spsFlag = true;
        this.concertFlag = false;
        // Clear old table data
        this.datosData = [];

        this.rawData = [];
        this.sipsData = [];
        this.sipsDisplayColumns = [];

        this.titularRawData = [];
        this.titularData = [];
        this.titularDisplayColumns = [];

        this.estudioRawData = [];
        this.estudioData = [];
        this.estudioDisplayColumns = [];

        this.resumenRawData = [];
        this.resumenData = [];
        this.resumenDisplayColumns = [];
        this.diasTotal = 0;
        this.cP1 = 0;
        this.cP2 = 0;
        this.cP3 = 0;
        this.cP4 = 0;
        this.cP5 = 0;
        this.cP6 = 0;
        this.cT = 0;
        this.cmP1 = 0;
        this.cmP2 = 0;
        this.cmP3 = 0;
        this.cmP4 = 0;
        this.cmP5 = 0;
        this.cmP6 = 0;
        this.reTotal = 0;

        // Clear Concert table data
        this.concertData = [];
        this.concertTable = new MatTableDataSource(this.concertData);
        this.concertTable.paginator = this.concertPaginator;
        this.concertTable.sort = this.concertSort;

        // Datos Table
        Object.values(res.data.cupss.ES00210489898749879.lecturas).map((el: any) => {
          const oneDay: any = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const firstDate: any = new Date(this.datePipe.transform(el.fechainiciomesconsumo.value));
          const secondDate: any = new Date(this.datePipe.transform(el.fechafinmesconsumo.value));

          const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

          this.datosData.push({
            fechainiciomesconsumo: this.datePipe.transform(el.fechainiciomesconsumo.value, 'dd/MM/yyyy'),
            fechafinmesconsumo: this.datePipe.transform(el.fechafinmesconsumo.value, 'dd/MM/yyyy'),
            diff: diffDays,
            codigotarifaatr: el.codigotarifaatr,
            consumoenergiaactivaenwhp1: el.consumoenergiaactivaenwhp1,
            consumoenergiaactivaenwhp2: el.consumoenergiaactivaenwhp2,
            consumoenergiaactivaenwhp3: el.consumoenergiaactivaenwhp3,
            consumoenergiaactivaenwhp4: el.consumoenergiaactivaenwhp4,
            consumoenergiaactivaenwhp5: el.consumoenergiaactivaenwhp5,
            consumoenergiaactivaenwhp6: el.consumoenergiaactivaenwhp6,
            potenciademandadaenwp1: el.potenciademandadaenwp1,
            potenciademandadaenwp2: el.potenciademandadaenwp2,
            potenciademandadaenwp3: el.potenciademandadaenwp3,
            potenciademandadaenwp4: el.potenciademandadaenwp4,
            potenciademandadaenwp5: el.potenciademandadaenwp5,
            potenciademandadaenwp6: el.potenciademandadaenwp6,
            consumoenergiareactivaenvarhp1: el.consumoenergiareactivaenvarhp1,
            consumoenergiareactivaenvarhp2: el.consumoenergiareactivaenvarhp2,
            consumoenergiareactivaenvarhp3: el.consumoenergiareactivaenvarhp3,
            consumoenergiareactivaenvarhp4: el.consumoenergiareactivaenvarhp4,
            consumoenergiareactivaenvarhp5: el.consumoenergiareactivaenvarhp5,
            consumoenergiareactivaenvarhp6: el.consumoenergiareactivaenvarhp6,
            reactiva: el.reactiva,
          });

          this.diasTotal += diffDays;
          this.cP1 += el.consumoenergiaactivaenwhp1;
          this.cP2 += el.consumoenergiaactivaenwhp2;
          this.cP3 += el.consumoenergiaactivaenwhp3;
          this.cP4 += el.consumoenergiaactivaenwhp4;
          this.cP5 += el.consumoenergiaactivaenwhp5;
          this.cP6 += el.consumoenergiaactivaenwhp6;
          this.cT += this.cP1 + this.cP2 + this.cP3 + this.cP4 + this.cP5 + this.cP6;
          this.reTotal += el.reactiva;
        });
        this.cmP1 = this.cP1 / this.cT * 100;
        this.cmP2 = this.cP2 / this.cT * 100;
        this.cmP3 = this.cP3 / this.cT * 100;
        this.cmP4 = this.cP4 / this.cT * 100;
        this.cmP5 = this.cP5 / this.cT * 100;
        this.cmP6 = this.cP6 / this.cT * 100;

        this.datosTable = new MatTableDataSource(this.datosData);
        this.datosTable.paginator = this.datosPaginator;
        this.datosTable.sort = this.datosSort;

        // Sips Table
        this.rawData.push({
          CUPS: res.data.cupss.ES00210489898749879.cups,
          'Fecha Alta Suministro': this.datePipe.transform(res.data.cupss.ES00210489898749879.fechaaltasuministro.value, 'dd/MM/yyyy'),
          // tslint:disable-next-line: max-line-length
          'Fecha ultimo cambio Comercializador': this.datePipe.transform(res.data.cupss.ES00210489898749879.fechaultimocambiocomercializador.value, 'dd/MM/yyyy'),
          Tarifa: res.data.cupss.ES00210489898749879.codigotarifaatrenvigor,
          Tension: res.data.cupss.ES00210489898749879.codigotensionv,
          'Potencia contratada P1': res.data.cupss.ES00210489898749879.potenciascontratadasenwp1,
          'Potencia contratada P2': res.data.cupss.ES00210489898749879.potenciascontratadasenwp2,
          'Potencia contratada P3': res.data.cupss.ES00210489898749879.potenciascontratadasenwp3,
          'Potencia contratada P4': res.data.cupss.ES00210489898749879.potenciascontratadasenwp4,
          'Potencia contratada P5': res.data.cupss.ES00210489898749879.potenciascontratadasenwp5,
          'Potencia contratada P6': res.data.cupss.ES00210489898749879.potenciascontratadasenwp6,
          'Potencia maxima BIE': res.data.cupss.ES00210489898749879.potenciamaximabiew,
          'Derechos de acceso': res.data.cupss.ES00210489898749879.valorderechosaccesow,
          'Derechos de extension': res.data.cupss.ES00210489898749879.valorderechosextensionw,
          Direccion: res.data.cupss.ES00210489898749879.direccion,
          'ID Comercializadora': res.data.cupss.ES00210489898749879.idcomercializadora,
          Comercializadora: res.data.cupss.ES00210489898749879.comercializadora,
        });
        this.sipsDisplayColumns = ['0'].concat(this.rawData.map(x => x.CUPS.toString()));
        this.sipsData = this.sipsInputColumns.map(x => this.formatInputRow(x));

        // Titular Table
        this.titularRawData.push({
          Documento: res.data.cupss.ES00210489898749879.cif,
          'Nombre y Apellido': res.data.cupss.ES00210489898749879.titularnombre + ', ' + res.data.cupss.ES00210489898749879.titularapellido,
          Direccion: res.data.cupss.ES00210489898749879.titulardireccion + ', ' + res.data.cupss.ES00210489898749879.titularlocalidad,
          'Codigo Postal': res.data.cupss.ES00210489898749879.titularcp + ', ' + res.data.cupss.ES00210489898749879.titularprovincia,
          Telefono: res.data.cupss.ES00210489898749879.telefono,
        });
        this.titularDisplayColumns = ['0'].concat(this.titularRawData.map(x => x.Documento.toString()));
        this.titularData = this.titularInputColumns.map(x => this.titularformatInputRow(x));

        // Estudio Table
        this.estudioRawData.push({
          ConsumoAnual: res.data.cupss.ES00210489898749879.consumoanual,
          'Dias de estudio': res.data.cupss.ES00210489898749879.consumoanualdias,
          // tslint:disable-next-line: max-line-length
          'Consumo Per': res.data.cupss.ES00210489898749879.consumop1 + ', ' + res.data.cupss.ES00210489898749879.consumop2 + ', '  + res.data.cupss.ES00210489898749879.consumop3,
          // tslint:disable-next-line: max-line-length
          'Potencias Opt': res.data.cupss.ES00210489898749879.periodo1 + ', ' + res.data.cupss.ES00210489898749879.periodo2 + ', '  + res.data.cupss.ES00210489898749879.periodo3,
          // tslint:disable-next-line: max-line-length
          Precios: res.data.cupss.ES00210489898749879.precio + ', ' + res.data.cupss.ES00210489898749879.precioausarta + ', '  + res.data.cupss.ES00210489898749879.precio + '-' + res.data.cupss.ES00210489898749879.precioausarta,
        });
        this.estudioDisplayColumns = ['0'].concat(this.estudioRawData.map(x => x.ConsumoAnual.toString()));
        this.estudioData = this.estudioInputColumns.map(x => this.estudioformatInputRow(x));

        // Resumen Table
        this.resumenRawData.push({
          Diastotales: this.diasTotal,
          'Consumo P1': this.cP1,
          'Consumo P2': this.cP2,
          'Consumo P3': this.cP3,
          'Consumo P4': this.cP4,
          'Consumo P5': this.cP5,
          'Consumo P6': this.cP6,
          'Consumo Total': this.cT,
          'Consumo Medio P1': this.cmP1.toFixed(2),
          'Consumo Medio P2': this.cmP2.toFixed(2),
          'Consumo Medio P3': this.cmP3.toFixed(2),
          'Consumo Medio P4': this.cmP4.toFixed(2),
          'Consumo Medio P5': this.cmP5.toFixed(2),
          'Consumo Medio P6': this.cmP6.toFixed(2),
          'Reactiva Total': this.reTotal.toFixed(2),
        });
        this.resumenDisplayColumns = ['0'].concat(this.resumenRawData.map(x => x.Diastotales.toString()));
        this.resumenData = this.resumenInputColumns.map(x => this.resumenformatInputRow(x));
      });
  }

  formatInputRow(row) {
    const output = {};
    output[0] = row;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rawData.length; ++i) {
      output[this.rawData[i].CUPS] = this.rawData[i][row];
    }
    return output;
  }

  titularformatInputRow(row) {
    const output = {};
    output[0] = row;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.titularRawData.length; ++i) {
      output[this.titularRawData[i].Documento] = this.titularRawData[i][row];
    }
    return output;
  }

  estudioformatInputRow(row) {
    const output = {};
    output[0] = row;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.estudioRawData.length; ++i) {
      output[this.estudioRawData[i].ConsumoAnual] = this.estudioRawData[i][row];
    }
    return output;
  }

  resumenformatInputRow(row) {
    const output = {};
    output[0] = row;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.resumenRawData.length; ++i) {
      output[this.resumenRawData[i].Diastotales] = this.resumenRawData[i][row];
    }
    return output;
  }

  onConcert() {
    if (this.activationForm.invalid) {
      return;
    }
    const data = {
      cups: this.activationForm.value.cups,
      all_lects: this.activationForm.value.all_lects,
      cnmc: this.activationForm.value.cnmc,
      powerp1: this.activationForm.value.powerp1,
      powerp2: this.activationForm.value.powerp2,
      powerp3: this.activationForm.value.powerp3,
      powerp4: this.activationForm.value.powerp4,
      powerp5: this.activationForm.value.powerp5,
      powerp6: this.activationForm.value.powerp6,
      energy_prp1: this.activationForm.value.energy_prp1,
      energy_prp2: this.activationForm.value.energy_prp2,
      energy_prp3: this.activationForm.value.energy_prp3,
      energy_prp4: this.activationForm.value.energy_prp4,
      energy_prp5: this.activationForm.value.energy_prp5,
      energy_prp6: this.activationForm.value.energy_prp6,
      alq_diario: this.activationForm.value.alq_diario,
      react_sips: this.activationForm.value.react_sips ? 1 : 0,
      incremento: this.activationForm.value.incremento ? 1 : 0,
    };
    this.activationService.Concert(data)
      .subscribe((res: any) => {
        this.spsFlag = false;
        this.concertFlag = true;
        this.concertData = [];
        Object.values(res.data).map((el: any) => {
          this.concertData.push(el);
        });

        this.concertTable = new MatTableDataSource(this.concertData);
        this.concertTable.paginator = this.concertPaginator;
        this.concertTable.sort = this.concertSort;

        this.datosData = [];
        this.datosTable = new MatTableDataSource(this.datosData);
        this.datosTable.paginator = this.datosPaginator;
        this.datosTable.sort = this.datosSort;
      });
  }
}
