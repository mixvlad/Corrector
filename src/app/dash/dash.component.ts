import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.styl']
})
export class DashComponent implements OnInit {
  @Input() needed: boolean;
  @Output() rightAnswered = new EventEmitter<boolean>();
  selected = false;
  rightAnswer: boolean;

  currentClasses: {};
  setCurrentClasses() {
    this.rightAnswer = this.selected === this.needed;
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      selected: this.selected,
      right: this.rightAnswer,
      wrong: !this.rightAnswer
    };
  }

  constructor() {}

  ngOnInit() {
    this.setCurrentClasses();
  }

  clickDash() {
    this.selected = !this.selected;
    this.rightAnswer = this.selected === this.needed;
    this.rightAnswered.emit(this.selected === this.needed);
    this.setCurrentClasses();
  }
}
