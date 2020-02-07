import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: 'activations',
    component: MainComponent,
  },
  {
    path: 'activations/operations',
    component: OperationsComponent,
  },
  {
    path: 'activations/xml-reader',
    component: XmlImportComponent,
  },
  {
    path: 'activations/tasks',
    component: TasksComponent,
  },
  {
    path: 'activations/format',
    component: FormatComponent,
  },
  {
    path: 'activations/bills',
    component: BillsComponent,
  },
  {
    path: 'activations/activations',
    component: ActivationsComponent,
  },
  {
    path: 'contabilidad',
    component: ContabilidadComponent,
  },
  {
    path: 'contabilidad/bancos',
    component: BancosComponent,
  },
  {
    path: 'contabilidad/transferencias',
    component: TransferenciasComponent,
  },
  {
    path: 'contabilidad/configurar-bancos',
    component: ConfigurarComponent,
  },
  {
    path: 'contabilidad/diamacon',
    component: DiamaconComponent,
  },
  {
    path: 'contabilidad/impuesto-electrico',
    component: ImpuestoComponent,
  },
  {
    path: 'contabilidad/exportar-clientes',
    component: ExportarComponent,
  },
  {
    path: 'contabilidad/tasa-municipal',
    component: TasaComponent,
  },
  {
    path: 'contabilidad/formateo-viesgo',
    component: FormateoComponent,
  },
  {
    path: 'contabilidad/subida-de-cs',
    component: SubidaComponent,
  },
  {
    path: 'facturacion',
    component: FacturacionComponent,
  },
  {
    path: 'facturacion/administraciones-face',
    component: AdministracionesComponent,
  },
  {
    path: 'facturacion/porcentaje-perdidas',
    component: PerdidasComponent,
  },
  {
    path: 'facturacion/precios-por-consumo',
    component: ConsumoComponent,
  },
  {
    path: 'facturacion/precios-potencia-atr',
    component: AtrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
