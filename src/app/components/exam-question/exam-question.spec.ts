import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuestionComponent } from './exam-question';

describe('ExamQuestion', () => {
  let component: ExamQuestionComponent;
  let fixture: ComponentFixture<ExamQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQuestionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
