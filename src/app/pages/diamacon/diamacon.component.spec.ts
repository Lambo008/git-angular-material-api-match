import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamaconComponent } from './diamacon.component';

describe('DiamaconComponent', () => {
  let component: DiamaconComponent;
  let fixture: ComponentFixture<DiamaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiamaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
