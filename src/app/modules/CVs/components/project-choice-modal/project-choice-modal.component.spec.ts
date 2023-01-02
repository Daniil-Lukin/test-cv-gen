import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChoiceModalComponent } from './project-choice-modal.component';

describe('ProjectChoiceModalComponent', () => {
  let component: ProjectChoiceModalComponent;
  let fixture: ComponentFixture<ProjectChoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectChoiceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectChoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
