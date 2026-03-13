import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.html',
  styleUrl: './learn-page.css'
})
export class LearnPage {
  questions: Question[] = [];
  currentIndex = 0;

  constructor(private questionService: QuestionService) {
    this.questions = this.questionService.getQuestions();
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToFirstQuestion(): void {
    this.currentIndex = 0;
  }

  goToLastQuestion(): void {
    this.currentIndex = this.questions.length - 1;
  }

  isCorrectAnswer(answerId: number): boolean {
    const question = this.currentQuestion;

    if (!question?.answers) {
      return false;
    }

    return question.answers.some(
      answer => answer.id === answerId && answer.isCorrect
    );
  }

  getProgress(): number {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }
}