import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullExamPage } from './full-exam-page';

describe('FullExamPage', () => {
  let component: FullExamPage;
  let fixture: ComponentFixture<FullExamPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullExamPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullExamPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
