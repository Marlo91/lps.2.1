import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Question } from '../../models/question.model';

export interface FullExamReviewAnswer {
  questionId: number;
  selectedAnswerIds: number[];
  fillInAnswer: string;
  isCorrect: boolean;
}

export interface FullExamResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  wasAborted: boolean;
  timeExpired: boolean;
  recommendation: string;
  reviewAnswers: FullExamReviewAnswer[];
}

@Component({
  selector: 'app-exam-question',
  imports: [],
  templateUrl: './exam-question.html',
  styleUrl: './exam-question.css'
})
export class ExamQuestionComponent implements OnChanges {
  @Input() mode: 'learn' | 'partial' | 'full' = 'partial';
  @Input() questions: Question[] = [];
  @Input() timeExpired = false;
  @Input() sessionId = 0;
  @Input() reviewMode = false;
  @Input() reviewAnswers: FullExamReviewAnswer[] = [];

  @Output() fullExamCompleted = new EventEmitter<FullExamResult>();

  currentIndex = 0;
  selectedAnswerIds = new Set<number>();
  fillInAnswer = '';

  isChecked = false;
  isFinished = false;

  correctCount = 0;
  wrongCount = 0;

  private fullExamReviewAnswers: FullExamReviewAnswer[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions'] && this.questions.length > 0) {
      this.resetSessionState();
    }

    if (changes['sessionId'] && !changes['sessionId'].firstChange) {
      this.resetSessionState();
    }

    if (
      changes['timeExpired'] &&
      this.mode === 'full' &&
      this.timeExpired &&
      !this.isFinished &&
      !this.reviewMode
    ) {
      this.finishFullExam(false, true);
    }

    if (changes['reviewMode'] && this.reviewMode) {
      this.currentIndex = 0;
      this.loadReviewAnswerForCurrentQuestion();
    }

    if (changes['reviewAnswers'] && this.reviewMode) {
      this.loadReviewAnswerForCurrentQuestion();
    }
  }

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentIndex];
  }

  get pageTitle(): string {
    if (this.reviewMode) {
      return 'Prüfungs-Review';
    }

    if (this.mode === 'learn') {
      return 'Lernmodus';
    }

    if (this.mode === 'full') {
      return 'Voll-Prüfungsmodus';
    }

    return 'Teil-Prüfungsmodus';
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  get hasPreviousQuestion(): boolean {
    return this.currentIndex > 0;
  }

  get hasNextQuestion(): boolean {
    return this.currentIndex < this.questions.length - 1;
  }

  get canSubmitAnswer(): boolean {
    if (this.reviewMode) {
      return false;
    }

    const question = this.currentQuestion;

    if (!question) {
      return false;
    }

    if (question.type === 'fill-in') {
      return this.fillInAnswer.trim().length > 0;
    }

    return this.selectedAnswerIds.size > 0;
  }

  getProgress(): number {
    if (this.questions.length === 0) {
      return 0;
    }

    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }

  nextQuestion(): void {
    if (!this.hasNextQuestion) {
      return;
    }

    this.currentIndex++;

    if (this.reviewMode) {
      this.loadReviewAnswerForCurrentQuestion();
      return;
    }

    this.resetAnswerState();
  }

  previousQuestion(): void {
    if (!this.hasPreviousQuestion) {
      return;
    }

    this.currentIndex--;

    if (this.reviewMode) {
      this.loadReviewAnswerForCurrentQuestion();
      return;
    }

    this.resetAnswerState();
  }

  goToFirstQuestion(): void {
    this.currentIndex = 0;

    if (this.reviewMode) {
      this.loadReviewAnswerForCurrentQuestion();
      return;
    }

    this.resetAnswerState();
  }

  goToLastQuestion(): void {
    this.currentIndex = this.questions.length - 1;

    if (this.reviewMode) {
      this.loadReviewAnswerForCurrentQuestion();
      return;
    }

    this.resetAnswerState();
  }

  onAnswerChange(answerId: number, checked: boolean): void {
    if (this.reviewMode) {
      return;
    }

    if (checked) {
      this.selectedAnswerIds.add(answerId);
      return;
    }

    this.selectedAnswerIds.delete(answerId);
  }

  onSingleAnswerSelect(answerId: number): void {
    if (this.reviewMode) {
      return;
    }

    this.selectedAnswerIds.clear();
    this.selectedAnswerIds.add(answerId);
  }

  onFillInAnswerChange(value: string): void {
    if (this.reviewMode) {
      return;
    }

    this.fillInAnswer = value;
  }

  isAnswerSelected(answerId: number): boolean {
    return this.selectedAnswerIds.has(answerId);
  }

  checkAnswers(): void {
    if (this.reviewMode) {
      return;
    }

    if (!this.currentQuestion || !this.canSubmitAnswer || this.isFinished) {
      return;
    }

    if (this.mode === 'full') {
      this.submitFullExamAnswer();
      return;
    }

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
    const correctAnswer = this.getNormalizedCorrectFillInAnswer();
    const userAnswer = this.fillInAnswer.trim().toLowerCase();

    if (!correctAnswer) {
      return false;
    }

    return userAnswer === correctAnswer;
  }

  getCorrectFillInAnswerForDisplay(): string {
    const question = this.currentQuestion;

    if (!question || question.type !== 'fill-in') {
      return 'Keine Antwort hinterlegt';
    }

    const correctAnswer = question.answers.find(answer => answer.isCorrect);

    if (!correctAnswer) {
      return 'Keine Antwort hinterlegt';
    }

    return correctAnswer.text;
  }

  getAnswerClass(answerId: number): string {
    if (this.mode === 'learn') {
      return this.isCorrectAnswer(answerId) ? 'correct-answer' : '';
    }

    if (this.reviewMode) {
      if (this.isCorrectAnswer(answerId)) {
        return 'correct-answer';
      }

      if (this.isAnswerSelected(answerId) && !this.isCorrectAnswer(answerId)) {
        return 'wrong-answer';
      }

      return '';
    }

    if (!this.isChecked || this.mode === 'full') {
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
    if (this.mode === 'learn') {
      return this.isCorrectAnswer(answerId) ? 'Richtig' : '';
    }

    if (this.reviewMode) {
      if (this.isCorrectAnswer(answerId)) {
        return 'Richtig';
      }

      if (this.isAnswerSelected(answerId) && !this.isCorrectAnswer(answerId)) {
        return 'Falsch';
      }

      return '';
    }

    if (!this.isChecked || this.mode === 'full') {
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

  getCurrentReviewAnswer(): FullExamReviewAnswer | undefined {
    const question = this.currentQuestion;

    if (!question) {
      return undefined;
    }

    return this.reviewAnswers.find(answer => answer.questionId === question.id);
  }

  private submitFullExamAnswer(): void {
    const question = this.currentQuestion;

    if (!question) {
      return;
    }

    const isCorrect = this.isCurrentAnswerCorrect();

    this.fullExamReviewAnswers.push({
      questionId: question.id,
      selectedAnswerIds: Array.from(this.selectedAnswerIds),
      fillInAnswer: this.fillInAnswer,
      isCorrect
    });

    if (isCorrect) {
      this.correctCount++;
    } else {
      this.wrongCount++;
    }

    if (this.wrongCount >= 8) {
      this.finishFullExam(true, false);
      return;
    }

    if (this.isLastQuestion) {
      this.finishFullExam(false, false);
      return;
    }

    this.currentIndex++;
    this.resetAnswerState();
  }

  private isCurrentAnswerCorrect(): boolean {
    const question = this.currentQuestion;

    if (!question) {
      return false;
    }

    if (question.type === 'fill-in') {
      return this.isFillInCorrect();
    }

    const correctAnswerIds = question.answers
      .filter(answer => answer.isCorrect)
      .map(answer => answer.id)
      .sort((a, b) => a - b);

    const selectedAnswerIds = Array.from(this.selectedAnswerIds).sort((a, b) => a - b);

    if (correctAnswerIds.length !== selectedAnswerIds.length) {
      return false;
    }

    return correctAnswerIds.every(
      (answerId, index) => answerId === selectedAnswerIds[index]
    );
  }

  private getNormalizedCorrectFillInAnswer(): string {
    const question = this.currentQuestion;

    if (!question || question.type !== 'fill-in') {
      return '';
    }

    const correctAnswer = question.answers.find(answer => answer.isCorrect);

    if (!correctAnswer) {
      return '';
    }

    return correctAnswer.text.trim().toLowerCase();
  }

  private loadReviewAnswerForCurrentQuestion(): void {
    const reviewAnswer = this.getCurrentReviewAnswer();

    this.selectedAnswerIds.clear();
    this.fillInAnswer = '';
    this.isChecked = false;

    if (!reviewAnswer) {
      return;
    }

    reviewAnswer.selectedAnswerIds.forEach(answerId => this.selectedAnswerIds.add(answerId));
    this.fillInAnswer = reviewAnswer.fillInAnswer;
  }

  private finishFullExam(wasAborted: boolean, timeExpired: boolean): void {
    this.isFinished = true;

    this.fullExamCompleted.emit({
      totalQuestions: this.questions.length,
      correctAnswers: this.correctCount,
      wrongAnswers: this.wrongCount,
      wasAborted,
      timeExpired,
      recommendation: wasAborted
        ? 'Nutze den Lernmodus, um den Stoff besser zu lernen.'
        : '',
      reviewAnswers: this.fullExamReviewAnswers
    });
  }

  private resetAnswerState(): void {
    this.selectedAnswerIds.clear();
    this.fillInAnswer = '';
    this.isChecked = false;
  }

  private resetSessionState(): void {
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.isFinished = false;
    this.fullExamReviewAnswers = [];
    this.resetAnswerState();
  }
}