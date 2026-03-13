import { Component } from '@angular/core';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question';

@Component({
  selector: 'app-full-exam-page',
  imports: [ExamQuestionComponent],
  templateUrl: './full-exam-page.html',
  styleUrl: './full-exam-page.css'
})
export class FullExamPage {
}