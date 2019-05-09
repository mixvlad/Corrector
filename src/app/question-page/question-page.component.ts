import { Question } from './../question';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.styl']
})
export class QuestionPageComponent implements OnInit {
  @Input() question: Question;
  @Output() rightAnswered = new EventEmitter<boolean>();
  answered: boolean;
  needHelp: boolean;
  rightAnswer: boolean;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private location: Location) {}

  ngOnInit(): void {
    this.answered = false;
  }

  answer(isCorrect: boolean): void {
    this.answered = true;
    this.rightAnswer = this.question.isCorrect === isCorrect;
  }

  next(): void {
    this.rightAnswered.emit(this.rightAnswer);
    this.answered = false;
    this.needHelp = false;
  }

  help(): void {
    this.needHelp = true;
  }
}
