import { Component, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
})
export class PopUpComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Editar Curso',
        icon: 'bi bi-pencil-square',
        command: () => {
          // Lógica para editar el curso
        }
      },
      {
        label: 'Borrar Curso',
        icon: 'bi bi-trash',
        command: () => {
          // Lógica para borrar el curso
        }
      }
    ];
  }
}
