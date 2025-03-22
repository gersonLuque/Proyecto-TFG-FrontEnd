import { Component, Input } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-contra',
  imports: [FormsModule, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './input-contra.component.html',
  styleUrl: './input-contra.component.css'
})
export class InputContraComponent {

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input({required:true}) form : FormGroup

}
