import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { createMarvin, Marvin } from '@chemaxon/marvin';
import { getDefaultSettings } from '@chemaxon/marvin/marvin-extensions';

@Component({
  selector: 'app-marvin',
  standalone: true,
  templateUrl: './marvin.component.html',
  styleUrls: ['./marvin.component.scss'],
})
export class MarvinComponent implements AfterContentInit {
  @Input() settings: any = {};
  @Output() setMarvinRef = new EventEmitter<Marvin>();
  @ViewChild('marvinContainer', { static: true })
  marvinContainer!: ElementRef<HTMLDivElement>;

  ngAfterContentInit() {
    const MARVIN_WEBSERVICES_HOST = '';

    if (this.marvinContainer) {
      createMarvin(this.marvinContainer.nativeElement, {
        ...getDefaultSettings(MARVIN_WEBSERVICES_HOST),
        ...this.settings,
      })
        .then((marvin) => {
          this.setMarvinRef.emit(marvin);
        })
        .catch((error) => {
          console.error('Error initializing Marvin:', error);
        });
    }
  }
}
