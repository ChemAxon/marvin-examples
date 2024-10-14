import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MarvinproComponent} from './marvinpro/marvinpro.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarvinproComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marvinpro-angular';
}
