import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { AdminData } from '../../models/admin.model';

@Component({
  selector: 'app-administraciones',
  templateUrl: './administraciones.component.html',
  styleUrls: ['./administraciones.component.css']
})
export class AdministracionesComponent implements OnInit {
  clients: string;

  adminData: AdminData[] = [];
  tableSource: MatTableDataSource<AdminData>;
  displayedColumns: string[] = [
    'firstname',
    'of_cont_code',
    'of_cont_name',
    'or_gest_code',
    'or_gest_name',
    'un_tram_code',
    'un_tram_name',
    'created',
    'action',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public adminService: AdminService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.adminService.getFace()
      .subscribe((res: any) => {
        Object.values(res.data.faces).map((el: any) => {
          this.adminData.push({
            id: el.id,
            firstname: el.customer.firstname,
            of_cont_code: el.of_cont_code,
            of_cont_name: el.of_cont_name,
            or_gest_code: el.or_gest_code,
            or_gest_name: el.or_gest_name,
            un_tram_code: el.un_tram_code,
            un_tram_name: el.un_tram_name,
            created: this.datePipe.transform(el.created, 'dd/MM/yyyy'),
          });
        });
        this.tableSource = new MatTableDataSource(this.adminData);
        this.tableSource.paginator = this.paginator;
        this.tableSource.sort = this.sort;
      });
  }

  onBuscar() {
    if (!this.clients) {
      return;
    }
    this.adminService.postBuscar(this.clients)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  onDelete(id: number) {
    this.adminService.postDelete(id)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
