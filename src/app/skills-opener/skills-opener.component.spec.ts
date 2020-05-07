import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsOpenerComponent } from './skills-opener.component';

describe('SkillsOpenerComponent', () => {
  let component: SkillsOpenerComponent;
  let fixture: ComponentFixture<SkillsOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
