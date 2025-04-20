import {Component, Input} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  standalone: true,
  imports: [MenuModule, ToastModule, ButtonModule],
})
export class PopUpComponent {
  @Input({required : true}) items: MenuItem[]
}
