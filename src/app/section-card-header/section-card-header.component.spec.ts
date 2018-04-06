import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCardHeaderComponent } from './section-card-header.component';

describe('SectionCardHeaderComponent', () => {
  let component: SectionCardHeaderComponent;
  let fixture: ComponentFixture<SectionCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
