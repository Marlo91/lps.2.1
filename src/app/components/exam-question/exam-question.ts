import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-exam-question',
  imports: [],
  templateUrl: './exam-question.html',
  styleUrl: './exam-question.css'
})
export class ExamQuestionComponent {
  questions: Question[] = [];
  currentIndex = 0;

  selectedAnswerIds = new Set<number>();
  fillInAnswer = '';

  isChecked = false;
  isFinished = false;

  constructor(private questionService: QuestionService) {
    this.questions = this.questionService.getQuestions();
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.resetCurrentState();
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetCurrentState();
    }
  }

  goToFirstQuestion(): void {
    this.currentIndex = 0;
    this.resetCurrentState();
  }

  goToLastQuestion(): void {
    this.currentIndex = this.questions.length - 1;
    this.resetCurrentState();
  }

  onAnswerChange(answerId: number, checked: boolean): void {
    if (checked) {
      this.selectedAnswerIds.add(answerId);
      return;
    }

    this.selectedAnswerIds.delete(answerId);
  }

  onSingleAnswerSelect(answerId: number): void {
    this.selectedAnswerIds.clear();
    this.selectedAnswerIds.add(answerId);
  }

  onFillInAnswerChange(value: string): void {
    this.fillInAnswer = value;
  }

  isAnswerSelected(answerId: number): boolean {
    return this.selectedAnswerIds.has(answerId);
  }

  checkAnswers(): void {
    this.isChecked = true;
  }

  finish(): void {
    this.isFinished = true;
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

  isFillInCorrect(): boolean {
    const question = this.currentQuestion;

    if (!question || question.type !== 'fill-in' || !question.correctAnswer) {
      return false;
    }

    return (
      this.fillInAnswer.trim().toLowerCase() ===
      question.correctAnswer.trim().toLowerCase()
    );
  }

  getAnswerClass(answerId: number): string {
    if (!this.isChecked) {
      return '';
    }

    if (this.isCorrectAnswer(answerId)) {
      return 'correct-answer';
    }

    if (this.isAnswerSelected(answerId) && !this.isCorrectAnswer(answerId)) {
      return 'wrong-answer';
    }

    return '';
  }

  getAnswerStatusText(answerId: number): string {
    if (!this.isChecked) {
      return '';
    }

    if (this.isCorrectAnswer(answerId)) {
      return 'Richtig';
    }

    if (this.isAnswerSelected(answerId) && !this.isCorrectAnswer(answerId)) {
      return 'Falsch';
    }

    return '';
  }

  private resetCurrentState(): void {
    this.selectedAnswerIds.clear();
    this.fillInAnswer = '';
    this.isChecked = false;
  }
}