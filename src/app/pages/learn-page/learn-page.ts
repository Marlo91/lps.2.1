import { Component } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ExamQuestionComponent } from '../../components/exam-question/exam-question';

@Component({
  selector: 'app-learn-page',
  imports: [ExamQuestionComponent],
  templateUrl: './learn-page.html',
  styleUrl: './learn-page.css'
})
export class LearnPage {
  questions: Question[] = [];
  sessionId = 0;

  constructor(private questionService: QuestionService) {
    this.startLearningRound();
  }

  startLearningRound(): void {
    this.questions = this.questionService.getShuffledQuestions();
    this.sessionId++;
  }
}