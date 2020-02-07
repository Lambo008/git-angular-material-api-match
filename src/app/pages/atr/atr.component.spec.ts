import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrComponent } from './atr.component';

describe('AtrComponent', () => {
  let component: AtrComponent;
  let fixture: ComponentFixture<AtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
