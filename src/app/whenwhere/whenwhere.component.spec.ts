import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenwhereComponent } from './whenwhere.component';

describe('WhenwhereComponent', () => {
  let component: WhenwhereComponent;
  let fixture: ComponentFixture<WhenwhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenwhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenwhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
