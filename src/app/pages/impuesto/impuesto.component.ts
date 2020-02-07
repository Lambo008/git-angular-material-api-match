import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImpuestoService } from '../../services/impuesto.service';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {
  impuestoForm = this.fb.group({
    date: ['', Validators.required],
    liquidableCheck: false,
    calcularCheck: false,
    ficheroCheck: false
  });

  constructor(
    private fb: FormBuilder,
    public impuestoService: ImpuestoService
  ) {}

  ngOnInit() {}

  onBuscar() {
    if (this.impuestoForm.invalid) {
      return;
    }
    this.impuestoService.postBuscar(
      this.impuestoForm.value.date,
      this.impuestoForm.value.liquidableCheck,
      this.impuestoForm.value.calcularCheck,
      this.impuestoForm.value.ficheroCheck
    )
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
