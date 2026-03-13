import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: 1,
      type: 'single-choice',
      text: 'Which type of file system is created by mkfs when it is executed with the block device name only and without any additional parameters?',
      explanation: 'Without additional parameters mkfs creates an ext2 filesystem.',
      answers: [
        { id: 11, text: 'XFS', isCorrect: false },
        { id: 12, text: 'VFAT', isCorrect: false },
        { id: 13, text: 'ext2', isCorrect: true },
        { id: 14, text: 'ext3', isCorrect: false },
        { id: 15, text: 'ext4', isCorrect: false }
      ]
    },
    {
      id: 2,
      type: 'multiple-choice',
      text: 'Consider the following directory: drwxrwxr-x 2 root sales 4096 Jan 1 15:21 sales. Which command ensures new files created within the directory sales are owned by the group sales?',
      explanation: 'The setgid bit on a directory ensures that new files inherit the directory group.',
      answers: [
        { id: 21, text: 'chmod g+s sales', isCorrect: true },
        { id: 22, text: 'setpol -R newgroup=sales sales', isCorrect: false },
        { id: 23, text: 'chgrp -p sales sales', isCorrect: false },
        { id: 24, text: 'chown --persistent *.sales sales', isCorrect: false },
        { id: 25, text: 'chmod 2775 sales', isCorrect: true }
      ]
    },
    {
      id: 3,
      type: 'multiple-choice',
      text: 'In order to display all currently mounted filesystems, which of the following commands could be used?',
      explanation: 'The commands mount and cat /proc/self/mounts both list mounted filesystems.',
      answers: [
        { id: 31, text: 'cat /proc/self/mounts', isCorrect: true },
        { id: 32, text: 'free', isCorrect: false },
        { id: 33, text: 'lsmounts', isCorrect: false },
        { id: 34, text: 'mount', isCorrect: true },
        { id: 35, text: 'cat /proc/filesystems', isCorrect: false }
      ]
    },
    {
      id: 4,
      type: 'fill-in',
      text: 'Which program updates the database that is used by the locate command? (Specify ONLY the command without any path or parameters).',
      explanation: 'The locate command searches a database of file paths. The program updatedb updates this database.',
      correctAnswer: 'updatedb'
    }
  ];

  getQuestions(): Question[] {
    return this.questions;
  }
}