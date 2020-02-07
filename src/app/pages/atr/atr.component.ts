import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtrService } from '../../services/atr.service';
import {
  PotenciaData,
  AtrData,
  BaseData,
} from '../../models/atr.model';

@Component({
  selector: 'app-atr',
  templateUrl: './atr.component.html',
  styleUrls: ['./atr.component.css']
})
export class AtrComponent implements OnInit {
  potenciaData: PotenciaData[] = [];
  potenciaFormArray: FormArray;
  potenciaForm: FormGroup;
  potenciaDisplayedColumns = ['rate', 'power_prp1', 'power_prp2', 'power_prp3', 'power_prp4', 'power_prp5', 'power_prp6'];

  atrData: AtrData[] = [];
  atrFormArray: FormArray;
  atrForm: FormGroup;
  atrDisplayedColumns = ['rate', 'energy_prp1', 'energy_prp2', 'energy_prp3', 'energy_prp4', 'energy_prp5', 'energy_prp6'];

  baseData: BaseData[] = [];
  baseFormArray: FormArray;
  baseForm: FormGroup;
  baseDisplayedColumns = ['rate', 'energy_prp1', 'energy_prp2', 'energy_prp3', 'energy_prp4', 'energy_prp5', 'energy_prp6'];

  constructor(
    public atrService: AtrService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.potenciaForm = this.formBuilder.group({
      potencia: this.formBuilder.array([])
    });

    this.baseForm = this.formBuilder.group({
      base: this.formBuilder.array([])
    });

    this.atrForm = this.formBuilder.group({
      atr: this.formBuilder.array([])
    });

    this.atrService.getData()
      .subscribe((res: any) => {

        Object.keys(res.atr.rates).map(key => {
          Object.values(res.atr.powers).map(value => {
            if (key == value['rate_id']) {
              this.potenciaData.push({
                id: value['id'],
                rate_id: value['rate_id'],
                rate: res.atr.rates[key],
                power_prp1: value['power_prp1'],
                power_prp2: value['power_prp2'],
                power_prp3: value['power_prp3'],
                power_prp4: value['power_prp4'],
                power_prp5: value['power_prp5'],
                power_prp6: value['power_prp6'],
              });
            }
          });
          const potenciaFgs = this.potenciaData.map(PotenciaData.asFormGroup);
          this.potenciaFormArray = new FormArray(potenciaFgs);
          this.potenciaForm.setControl('potencia', this.potenciaFormArray);

          Object.values(res.atr.prices).map(value => {
            if (key == value['rate_id']) {
              this.atrData.push({
                id: value['id'],
                rate_id: value['rate_id'],
                rate: res.atr.rates[key],
                energy_prp1: value['energy_prp1'],
                energy_prp2: value['energy_prp2'],
                energy_prp3: value['energy_prp3'],
                energy_prp4: value['energy_prp4'],
                energy_prp5: value['energy_prp5'],
                energy_prp6: value['energy_prp6'],
              });
            }
          });
          const atrFgs = this.atrData.map(AtrData.asFormGroup);
          this.atrFormArray = new FormArray(atrFgs);
          this.atrForm.setControl('atr', this.atrFormArray);

          Object.values(res.atr.prices_base).map(value => {
            if (key == value['rate_id']) {
              this.baseData.push({
                id: value['id'],
                rate_id: value['rate_id'],
                rate: res.atr.rates[key],
                energy_prp1: value['energy_prp1'],
                energy_prp2: value['energy_prp2'],
                energy_prp3: value['energy_prp3'],
                energy_prp4: value['energy_prp4'],
                energy_prp5: value['energy_prp5'],
                energy_prp6: value['energy_prp6'],
              });
            }
          });
          const baseFgs = this.baseData.map(BaseData.asFormGroup);
          this.baseFormArray = new FormArray(baseFgs);
          this.baseForm.setControl('base', this.baseFormArray);

        });
      });
  }

  get potencia(): FormArray {
    return this.potenciaForm.get('potencia') as FormArray;
  }

  get base(): FormArray {
    return this.baseForm.get('base') as FormArray;
  }

  get atr(): FormArray {
    return this.atrForm.get('atr') as FormArray;
  }

  onPotencia() {
    this.atrService.postPotencia(this.potenciaForm.value.potencia)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  onAtr() {
    this.atrService.postAtr(this.atrForm.value.atr)
    .subscribe((res: any) => {
      console.log(res);
    });
  }

  onBase() {
    this.atrService.postBase(this.baseForm.value.base)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

}
