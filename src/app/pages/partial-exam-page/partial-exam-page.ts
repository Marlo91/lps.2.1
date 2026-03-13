import { Component } from '@angular/core';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question';

@Component({
  selector: 'app-partial-exam-page',
  imports: [ExamQuestionComponent],
  templateUrl: './partial-exam-page.html',
  styleUrl: './partial-exam-page.css'
})
export class PartialExamPage {
}