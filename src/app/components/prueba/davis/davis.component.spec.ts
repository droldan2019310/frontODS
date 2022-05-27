import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavisComponent } from './davis.component';

describe('DavisComponent', () => {
  let component: DavisComponent;
  let fixture: ComponentFixture<DavisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DavisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DavisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
