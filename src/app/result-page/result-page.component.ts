import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.styl']
})
export class ResultPageComponent implements OnInit {
  @Input() score: string;
  constructor() {}

  ngOnInit() {}
}
