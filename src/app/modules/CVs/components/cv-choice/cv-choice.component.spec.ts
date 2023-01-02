import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvChoiceComponent } from './cv-choice.component';

describe('CvChoiceComponent', () => {
  let component: CvChoiceComponent;
  let fixture: ComponentFixture<CvChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
