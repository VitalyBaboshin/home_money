import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})
export class SystemComponent {
  // байндим определенное свойств на элементе
  // прикрепляем анимацию с помощью знака @
  @HostBinding('@fade') a = true;
}
