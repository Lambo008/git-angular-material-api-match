import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DiamaconService } from '../../services/diamacon.service';

@Component({
  selector: 'app-diamacon',
  templateUrl: './diamacon.component.html',
  styleUrls: ['./diamacon.component.css']
})
export class DiamaconComponent implements OnInit {
  diamaconForm = this.fb.group({
    date: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, public diamaconService: DiamaconService) { }

  ngOnInit() {
  }

  onDiamacon() {
    if (this.diamaconForm.invalid) {
      return;
    }
    this.diamaconService.postDiamacon(this.diamaconForm.value.date)
      .subscribe((res: any) => {
        console.log(res.message);
      });
  }

}
