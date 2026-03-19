import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import {
  ExamQuestionComponent,
  FullExamResult,
  FullExamReviewAnswer
} from '../../components/exam-question/exam-question';

@Component({
  selector: 'app-full-exam-page',
  imports: [ExamQuestionComponent],
  templateUrl: './full-exam-page.html',
  styleUrl: './full-exam-page.css'
})
export class FullExamPage implements OnInit, OnDestroy {
  examResult: FullExamResult | null = null;
  examQuestions: Question[] = [];
  reviewAnswers: FullExamReviewAnswer[] = [];
  showReview = false;

  readonly examDurationInSeconds = 60;

  remainingSeconds = this.examDurationInSeconds;
  timeExpired = false;
  sessionId = 0;

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startNewExam();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
  }

  get correctPercentage(): number {
    if (!this.examResult || this.examQuestions.length === 0) {
      return 0;
    }

    return Math.round((this.examResult.correctAnswers / this.examQuestions.length) * 100);
  }

  get wrongPercentage(): number {
    if (!this.examResult || this.examQuestions.length === 0) {
      return 0;
    }

    return Math.round((this.examResult.wrongAnswers / this.examQuestions.length) * 100);
  }

  get examStatusText(): string {
    if (!this.examResult) {
      return '';
    }

    if (this.examResult.timeExpired) {
      return 'Nicht bestanden – Zeit abgelaufen';
    }

    if (this.examResult.wasAborted) {
      return 'Nicht bestanden – zu viele Fehler';
    }

    return 'Bestanden';
  }

  onFullExamCompleted(result: FullExamResult): void {
    this.examResult = result;
    this.reviewAnswers = result.reviewAnswers;
    this.showReview = false;
    this.clearTimer();
    this.cdr.detectChanges();
  }

  restartExam(): void {
    this.startNewExam();
    this.cdr.detectChanges();
  }

  openReview(): void {
    this.showReview = true;
  }

  closeReview(): void {
    this.showReview = false;
  }

  private startNewExam(): void {
    this.examResult = null;
    this.examQuestions = this.questionService.getRandomQuestions(20);
    this.reviewAnswers = [];
    this.showReview = false;

    this.timeExpired = false;
    this.remainingSeconds = this.examDurationInSeconds;
    this.sessionId++;

    this.startTimer();
  }

  private startTimer(): void {
    this.clearTimer();

    this.timerId = setInterval(() => {
      if (this.remainingSeconds <= 1) {
        this.remainingSeconds = 0;
        this.timeExpired = true;
        this.clearTimer();
        this.cdr.detectChanges();
        return;
      }

      this.remainingSeconds--;
      this.cdr.detectChanges();
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private padTime(value: number): string {
    return value.toString().padStart(2, '0');
  }
}