import { AfterContentInit, Component } from '@angular/core';
import { createMarvin } from '@chemaxon/marvin';

@Component({
  selector: 'app-marvinpro',
  standalone: true,
  imports: [],
  templateUrl: './marvinpro.component.html',
  styleUrl: './marvinpro.component.scss',
})
export class MarvinproComponent implements AfterContentInit {
  ngAfterContentInit() {
    const marvinproContainer = document.getElementById('marvin-app');

    if (marvinproContainer) {
      createMarvin(marvinproContainer, {}).then((mPro) => {});
    }
  }
}
