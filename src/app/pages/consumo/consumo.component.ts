import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConsumoService } from '../../services/consumo.service';
import {
  PriceType,
  PriceData,
} from '../../models/consumo.model';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {
  prices: PriceType[] = [];
  priceSelect: string;
  hiddenTable: boolean = true;
  priceData: PriceData[] = [];
  formArray: FormArray;
  form: FormGroup;
  displayedColumns = ['rate', 'energy_prp1', 'energy_prp2', 'energy_prp3', 'energy_prp4', 'energy_prp5', 'energy_prp6', 'trash'];

  insertForm = this.fb.group({
    insert: ['', Validators.required],
    nombre: ['', Validators.required],
  });

  constructor(
    public consumoService: ConsumoService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      price: this.formBuilder.array([])
    });

    this.consumoService.getPrices()
      .subscribe((res: any) => {
        Object.keys(res.prices.types).map(key => {
          this.prices.push({
            id: key,
            value: res.prices.types[key],
          })
        })
      })
  }

  onBusquesda() {
    if (this.priceSelect) {
      this.consumoService.postBusquesda(this.priceSelect)
        .subscribe((res: any) => {
          this.priceData = [];
          this.hiddenTable = false;
          Object.keys(res.price_response.rates).map(key => {
            Object.values(res.price_response.prices).map(value => {
              if (key == value['rate_id']) {
                this.priceData.push({
                  rate: res.price_response.rates[key],
                  energy_prp1: value['energy_prp1'],
                  energy_prp2: value['energy_prp2'],
                  energy_prp3: value['energy_prp3'],
                  energy_prp4: value['energy_prp4'],
                  energy_prp5: value['energy_prp5'],
                  energy_prp6: value['energy_prp6'],
                })
              }
            })
          })
          const fgs = this.priceData.map(PriceData.asFormGroup);
          this.formArray = new FormArray(fgs);
          this.form.setControl('price', this.formArray);
        })
    }
  }

  get price(): FormArray{
    return this.form.get('price') as FormArray;
  }

  onInsertar() {
    if (this.insertForm.invalid) {
      return;
    }
    this.consumoService.postInsert(this.insertForm)
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
