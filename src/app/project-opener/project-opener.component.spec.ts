import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOpenerComponent } from './project-opener.component';

describe('ProjectOpenerComponent', () => {
  let component: ProjectOpenerComponent;
  let fixture: ComponentFixture<ProjectOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
