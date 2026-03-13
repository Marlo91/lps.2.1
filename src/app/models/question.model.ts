export interface AnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'single-choice' | 'fill-in';
  text: string;
  explanation: string;
  answers?: AnswerOption[];
  correctAnswer?: string;
}