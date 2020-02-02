import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'wfm-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})
 export class AuthComponent implements OnInit {
  // байндим определенное свойств на элементе
  // прикрепляем анимацию с помощью знака @
  @HostBinding('@fade') a = true;
  constructor(private router: Router) {}

  ngOnInit() {
  this.router.navigate(['/login']);
  }
}
