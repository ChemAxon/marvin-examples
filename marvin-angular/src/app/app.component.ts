import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarvinComponent } from './marvin/marvin.component';
import { ExamplesComponent } from './examples/examples.component';
import { Marvin } from '@chemaxon/marvin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarvinComponent, ExamplesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'marvin-angular';
  marvinRef?: Marvin;

  onMarvinReady(marvin: Marvin) {
    this.marvinRef = marvin;
  }
}
