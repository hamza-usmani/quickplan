import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplanComponent } from './viewplan.component';

describe('ViewplanComponent', () => {
  let component: ViewplanComponent;
  let fixture: ComponentFixture<ViewplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
