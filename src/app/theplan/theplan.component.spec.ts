import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheplanComponent } from './theplan.component';

describe('TheplanComponent', () => {
  let component: TheplanComponent;
  let fixture: ComponentFixture<TheplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
