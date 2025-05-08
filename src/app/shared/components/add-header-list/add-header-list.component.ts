import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-header-list',
  imports: [
    RouterLink
  ],
  templateUrl: './add-header-list.component.html',
  styleUrl: './add-header-list.component.css'
})
export class AddHeaderListComponent {

  

  @Input() titleList: string = 'Título';
  @Input() btnAddText?: string = 'Crear';
  @Input() routing: string = '';
  @Input() rol: string = '';
}
