import { Component, OnInit } from '@angular/core';
import { PerdidasService } from '../../services/perdidas.service';
import { map } from 'rxjs/operators';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  DayType,
  LooseData,
} from '../../models/perdidas.model';

@Component({
  selector: 'app-perdidas',
  templateUrl: './perdidas.component.html',
  styleUrls: ['./perdidas.component.css']
})
export class PerdidasComponent implements OnInit {
  anoSelect: DayType[] = [];
  mesSelect: DayType[] = [];
  selectForm = this.fb.group({
    ano: ['', Validators.required],
    mes: ['', Validators.required],
  });
  looseData: LooseData[] = [];
  formArray: FormArray;
  form: FormGroup;
  displayedColumns = [ 'rates_list', 'losses_p1', 'losses_p2', 'losses_p3', 'losses_p4', 'losses_p5', 'losses_p6'];

  constructor(
    public perdidasService: PerdidasService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
  ) {
    this.selectForm.valueChanges
      .subscribe(val => {
        if (this.selectForm.valid) {
          this.changeLoose(
            this.selectForm.value.ano,
            this.selectForm.value.mes,
          );
        }
      });
   }

  ngOnInit() {

    this.form = this.formBuilder.group({
      loose: this.formBuilder.array([])
    });

    this.perdidasService.getDay()
      .subscribe((res: any) => {
        Object.keys(res.perdidas.years).map(key => {
          this.anoSelect.push({
            id: key,
            value: res.perdidas.years[key],
          });
        });
        Object.keys(res.perdidas.months).map(key => {
          this.mesSelect.push({
            id: key,
            value: res.perdidas.months[key],
          });
        });
      });

    this.perdidasService.getLoose()
      .subscribe((res: any) => {
        Object.keys(res.loose.rates_list).map(key => {
          Object.values(res.loose.erlosses).map(value => {
            if (key == value['rate_id']) {
              this.looseData.push({
                id: value['id'],
                rate_id: value['rate_id'],
                rates_list: res.loose.rates_list[key],
                losses_p1: value['losses_p1'],
                losses_p2: value['losses_p2'],
                losses_p3: value['losses_p3'],
                losses_p4: value['losses_p4'],
                losses_p5: value['losses_p5'],
                losses_p6: value['losses_p6'],
              });
            }
          });
        });
        const fgs = this.looseData.map(LooseData.asFormGroup);
        this.formArray = new FormArray(fgs);
        this.form.setControl('loose', this.formArray);
      });
  }

  get loose(): FormArray {
    return this.form.get('loose') as FormArray;
  }

  changeLoose(year: string, month: string) {
    this.perdidasService.getDateLoose(year, month)
      .subscribe((res: any) => {
        this.looseData = [];
        Object.keys(res.loose.rates_list).map(key => {
          Object.values(res.loose.erlosses).map(value => {
            if (key == value['rate_id']) {
              this.looseData.push({
                id: value['id'],
                rate_id: value['rate_id'],
                rates_list: res.loose.rates_list[key],
                losses_p1: value['losses_p1'],
                losses_p2: value['losses_p2'],
                losses_p3: value['losses_p3'],
                losses_p4: value['losses_p4'],
                losses_p5: value['losses_p5'],
                losses_p6: value['losses_p6'],
              });
            }
          });
        });
        const fgs = this.looseData.map(LooseData.asFormGroup);
        this.formArray = new FormArray(fgs);
        this.form.setControl('loose', this.formArray);
      });
  }

  onGuardar() {
    this.perdidasService.postGuardar(this.form.value.loose)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
