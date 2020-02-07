import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionesComponent } from './administraciones.component';

describe('AdministracionesComponent', () => {
  let component: AdministracionesComponent;
  let fixture: ComponentFixture<AdministracionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
