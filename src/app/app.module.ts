import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import {
        FormsModule,
        ReactiveFormsModule,
      } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './core/material/material.module';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { FileSelectDirective } from 'ng2-file-upload';
import { MainComponent } from './pages/main/main.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { XmlImportComponent } from './pages/xml-import/xml-import.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { FormatComponent } from './pages/format/format.component';
import { BillsComponent } from './pages/bills/bills.component';
import { ActivationsComponent } from './pages/activations/activations.component';
import { ContabilidadComponent } from './pages/contabilidad/contabilidad.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { ConfigurarComponent } from './pages/configurar/configurar.component';
import { DiamaconComponent } from './pages/diamacon/diamacon.component';
import { ImpuestoComponent } from './pages/impuesto/impuesto.component';
import { ExportarComponent } from './pages/exportar/exportar.component';
import { TasaComponent } from './pages/tasa/tasa.component';
import { FormateoComponent } from './pages/formateo/formateo.component';
import { SubidaComponent } from './pages/subida/subida.component';
import { AdministracionesComponent } from './pages/administraciones/administraciones.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { PerdidasComponent } from './pages/perdidas/perdidas.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { AtrComponent } from './pages/atr/atr.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OperationsComponent,
    XmlImportComponent,
    TasksComponent,
    FormatComponent,
    BillsComponent,
    ActivationsComponent,
    FileSelectDirective,
    ContabilidadComponent,
    BancosComponent,
    TransferenciasComponent,
    ConfigurarComponent,
    DiamaconComponent,
    ImpuestoComponent,
    ExportarComponent,
    TasaComponent,
    FormateoComponent,
    SubidaComponent,
    AdministracionesComponent,
    FacturacionComponent,
    PerdidasComponent,
    ConsumoComponent,
    AtrComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
