import { GameService } from '../game.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dash-game',
  templateUrl: './dash-game.component.html',
  styleUrls: ['./dash-game.component.styl']
})
export class DashGameComponent implements OnInit {
  questions: Question[];
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  showResult: boolean;
  constructor(private questionService: GameService, private messageService: MessageService) {}

  ngOnInit() {
    this.startNewGame();
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
    }
  }

  startNewGame(): void {
    this.score = 0;
    this.currentIndex = 0;
    this.currentQuestion = null;
    this.showResult = false;
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions('dashQuestions').subscribe(questions => {
      this.questions = this.questionService.getRandom(questions, 5);
      this.currentQuestion = this.questions[this.currentIndex];
      this.totalQuestions = this.questions.length;
      this.messageService.add(`questionService: ${this.currentQuestion.correctText}`);
    });
  }
}
