import { Component, Input } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [FormsModule, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './input-login.component.html',
  styleUrls: ['./input-login.component.css']
})
export class InputLoginComponent {

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input({required:true}) form : FormGroup

}
