import { FormControl, FormGroup, Validators } from '@angular/forms';

export class PotenciaData {
  id: string;
  rate_id: string;
  rate: string;
  power_prp1: string;
  power_prp2: string;
  power_prp3: string;
  power_prp4: string;
  power_prp5: string;
  power_prp6: string;

  static asFormGroup(potenciaData: PotenciaData): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(potenciaData.id, Validators.required),
      rate_id: new FormControl(potenciaData.rate_id, Validators.required),
      rate: new FormControl(potenciaData.rate, Validators.required),
      power_prp1: new FormControl(potenciaData.power_prp1, Validators.required),
      power_prp2: new FormControl(potenciaData.power_prp2, Validators.required),
      power_prp3: new FormControl(potenciaData.power_prp3, Validators.required),
      power_prp4: new FormControl(potenciaData.power_prp4, Validators.required),
      power_prp5: new FormControl(potenciaData.power_prp5, Validators.required),
      power_prp6: new FormControl(potenciaData.power_prp6, Validators.required),
    });
      return fg;
    }
}

export class AtrData {
  id: string;
  rate_id: string;
  rate: string;
  energy_prp1: string;
  energy_prp2: string;
  energy_prp3: string;
  energy_prp4: string;
  energy_prp5: string;
  energy_prp6: string;

  static asFormGroup(atrData: AtrData): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(atrData.id, Validators.required),
      rate_id: new FormControl(atrData.rate_id, Validators.required),
      rate: new FormControl(atrData.rate, Validators.required),
      energy_prp1: new FormControl(atrData.energy_prp1, Validators.required),
      energy_prp2: new FormControl(atrData.energy_prp2, Validators.required),
      energy_prp3: new FormControl(atrData.energy_prp3, Validators.required),
      energy_prp4: new FormControl(atrData.energy_prp4, Validators.required),
      energy_prp5: new FormControl(atrData.energy_prp5, Validators.required),
      energy_prp6: new FormControl(atrData.energy_prp6, Validators.required),
    });
      return fg;
    }
}

export class BaseData {
  id: string;
  rate_id: string;
  rate: string;
  energy_prp1: string;
  energy_prp2: string;
  energy_prp3: string;
  energy_prp4: string;
  energy_prp5: string;
  energy_prp6: string;

  static asFormGroup(baseData: BaseData): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(baseData.id, Validators.required),
      rate_id: new FormControl(baseData.rate_id, Validators.required),
      rate: new FormControl(baseData.rate, Validators.required),
      energy_prp1: new FormControl(baseData.energy_prp1, Validators.required),
      energy_prp2: new FormControl(baseData.energy_prp2, Validators.required),
      energy_prp3: new FormControl(baseData.energy_prp3, Validators.required),
      energy_prp4: new FormControl(baseData.energy_prp4, Validators.required),
      energy_prp5: new FormControl(baseData.energy_prp5, Validators.required),
      energy_prp6: new FormControl(baseData.energy_prp6, Validators.required),
    });
      return fg;
    }
}
