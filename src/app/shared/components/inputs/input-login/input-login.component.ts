import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, InputTextModule],
  templateUrl: './input-login.component.html',
  styleUrls: ['./input-login.component.css']
})
export class InputLoginComponent {

  @Input() model: any;


  @Input() label: string = '';


  @Input() type: string = 'text';

  
  @Input() id: string = '';

  
  @Input() placeholder: string = '';
value3: any;

}
