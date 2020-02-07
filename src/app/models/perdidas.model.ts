import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DayType {
  id: string;
  value: string;
}

export class LooseData {
  id: string;
  rate_id: string;
  rates_list: string;
  losses_p1: string;
  losses_p2: string;
  losses_p3: string;
  losses_p4: string;
  losses_p5: string;
  losses_p6: string;

  static asFormGroup(looseData: LooseData): FormGroup {
  const fg = new FormGroup({
    id: new FormControl(looseData.id, Validators.required),
    rate_id: new FormControl(looseData.rate_id, Validators.required),
    rates_list: new FormControl(looseData.rates_list, Validators.required),
    losses_p1: new FormControl(looseData.losses_p1, Validators.required),
    losses_p2: new FormControl(looseData.losses_p2, Validators.required),
    losses_p3: new FormControl(looseData.losses_p3, Validators.required),
    losses_p4: new FormControl(looseData.losses_p4, Validators.required),
    losses_p5: new FormControl(looseData.losses_p5, Validators.required),
    losses_p6: new FormControl(looseData.losses_p6, Validators.required),
  });
    return fg;
  }
}
