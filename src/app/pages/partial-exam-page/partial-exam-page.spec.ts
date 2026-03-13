import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialExamPage } from './partial-exam-page';

describe('PartialExamPage', () => {
  let component: PartialExamPage;
  let fixture: ComponentFixture<PartialExamPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialExamPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialExamPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
