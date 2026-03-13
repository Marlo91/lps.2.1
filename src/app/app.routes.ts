import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LearnPage } from './pages/learn-page/learn-page';
import { ExamPage } from './pages/exam-page/exam-page';
import { PartialExamPage } from './pages/partial-exam-page/partial-exam-page';
import { FullExamPage } from './pages/full-exam-page/full-exam-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'learn',
    component: LearnPage
  },
  {
    path: 'exam',
    component: ExamPage
  },
  {
    path: 'exam/partial',
    component: PartialExamPage
  },
  {
    path: 'exam/full',
    component: FullExamPage
  }
];