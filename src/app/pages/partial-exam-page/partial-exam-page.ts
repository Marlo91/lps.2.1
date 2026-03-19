import { Component } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question';

@Component({
  selector: 'app-partial-exam-page',
  imports: [ExamQuestionComponent],
  templateUrl: './partial-exam-page.html',
  styleUrl: './partial-exam-page.css'
})
export class PartialExamPage {
  questions: Question[] = [];
  sessionId = 0;

  constructor(private questionService: QuestionService) {
    this.startExam();
  }

  startExam(): void {
    this.questions = this.questionService.getShuffledQuestions();
    this.sessionId++;
  }
}