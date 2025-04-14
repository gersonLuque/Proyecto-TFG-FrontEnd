import { Component, Input } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {Password} from 'primeng/password';

@Component({
  selector: 'app-input-contra',
  imports: [FormsModule, FloatLabelModule, InputTextModule, ReactiveFormsModule, Password],
  templateUrl: './input-contra.component.html',
  styleUrl: './input-contra.component.css'
})
export class InputContraComponent {

  @Input() id: string = '';
  @Input({required:true}) form : FormGroup
  @Input() showFeedBack: boolean = false;
}
