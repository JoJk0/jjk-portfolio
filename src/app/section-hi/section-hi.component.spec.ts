import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHiComponent } from './section-hi.component';

describe('SectionHiComponent', () => {
  let component: SectionHiComponent;
  let fixture: ComponentFixture<SectionHiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionHiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
