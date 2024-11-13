import { AfterContentInit, Component } from '@angular/core';
import { createMarvin } from '@chemaxon/marvin';

@Component({
  selector: 'app-marvin',
  standalone: true,
  imports: [],
  templateUrl: './marvin.component.html',
  styleUrl: './marvin.component.scss',
})
export class MarvinComponent implements AfterContentInit {
  ngAfterContentInit() {
    const marvinContainer = document.getElementById('marvin-app');

    if (marvinContainer) {
      createMarvin(marvinContainer, {}).then((mPro) => {});
    }
  }
}
