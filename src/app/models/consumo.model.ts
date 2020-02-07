import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface PriceType {
  id: string;
  value: string;
}

export class PriceData {
  rate: string;
  energy_prp1: string;
  energy_prp2: string;
  energy_prp3: string;
  energy_prp4: string;
  energy_prp5: string;
  energy_prp6: string;

  static asFormGroup(priceData: PriceData): FormGroup {
  const fg = new FormGroup({
    rate: new FormControl(priceData.rate, Validators.required),
    energy_prp1: new FormControl(priceData.energy_prp1, Validators.required),
    energy_prp2: new FormControl(priceData.energy_prp2, Validators.required),
    energy_prp3: new FormControl(priceData.energy_prp3, Validators.required),
    energy_prp4: new FormControl(priceData.energy_prp4, Validators.required),
    energy_prp5: new FormControl(priceData.energy_prp5, Validators.required),
    energy_prp6: new FormControl(priceData.energy_prp6, Validators.required),
  });
    return fg;
  }
}
