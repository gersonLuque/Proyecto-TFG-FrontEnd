import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FeatureModule} from './feature/feature.module';
import {HeaderComponent} from './shared/components/header/header.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'proyecto-front';
}
