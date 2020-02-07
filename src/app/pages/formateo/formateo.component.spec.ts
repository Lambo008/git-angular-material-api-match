import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateoComponent } from './formateo.component';

describe('FormateoComponent', () => {
  let component: FormateoComponent;
  let fixture: ComponentFixture<FormateoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormateoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
