import { MessageService } from './../message.service';
import { Question } from './../question';
import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-comma-game',
  templateUrl: './comma-game.component.html',
  styleUrls: ['./comma-game.component.styl']
})
export class CommaGameComponent implements OnInit {
  questions: Question[];
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  showResult: boolean;

  constructor(private questionService: GameService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.score = 0;
    this.currentIndex = 0;
    this.currentQuestion = null;
    this.showResult = false;
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions('commaQuestions').subscribe(questions => {
      this.questions = this.questionService.getRandom(questions, 5);
      this.currentQuestion = this.questions[this.currentIndex];
      this.totalQuestions = this.questions.length;
      this.messageService.add(`questionService: ${this.currentQuestion.correctText}`);
    });
  }

  onAnswered(rightAnswered: boolean) {
    if (rightAnswered === true) {
      this.score++;
    }
    this.next();
  }

  next(): void {
    this.currentIndex++;

    // if no more questions, show result
    if (this.currentIndex >= this.totalQuestions) {
      this.showResult = true;
    } else {
      this.currentQuestion = this.questions[this.currentIndex];
      this.messageService.add(`questionService: ${this.currentQuestion.correctText}`);
    }
  }
}
