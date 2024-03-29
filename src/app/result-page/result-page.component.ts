import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { range } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.styl']
})
export class ResultPageComponent implements OnInit {
  @Input() score: number;
  @Input() total: number;

  GetResultText(): string {
    switch (this.score) {
      case 0:
      case 1:
      case 2:
        return '«Мы все учились понемногу,<br />Чему-нибудь и как-нибудь».<br />Попробуйте еще.';
      case 3:
        return '«Ах, обмануть меня нетрудно,<br />Я сам обманываться рад!»<br />Будьте внимательнее.';
      case 4:
        return '«Какое это счастье — быть грамотным!»<br />Максим Горький';
      case 5:
        return 'В человеке всё должно быть прекрасно — как в вас!';
    }
  }

  constructor(userService: UserService) {
    const userId = localStorage.getItem('currentUserId');
    if (userId != null) {
      userService.getUser(+userId).subscribe(x => {
        x.score += this.score - 3;
        userService.updateUser(x).subscribe();
      });
    }
  }

  ngOnInit() {}
}
