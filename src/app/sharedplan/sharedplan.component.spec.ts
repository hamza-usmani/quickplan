import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedplanComponent } from './sharedplan.component';

describe('SharedplanComponent', () => {
  let component: SharedplanComponent;
  let fixture: ComponentFixture<SharedplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
