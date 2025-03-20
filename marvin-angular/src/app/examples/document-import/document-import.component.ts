import {
  Component,
  Input,
  signal,
} from '@angular/core';
import { Marvin, ImportOptions } from '@chemaxon/marvin';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacementType, ScaleType } from '@chemaxon/marvin/typings/api/marvin';

interface PlacementProps {
  value: PlacementType;
  displayValue: string;
}

interface ScaleProps {
  value: ScaleType;
  displayValue: string;
}

@Component({
  selector: 'app-document-import',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './document-import.component.html',
  styleUrls: ['../examples.component.scss'],
})
export class DocumentImportComponent {
  @Input() marvinRef?: Marvin;

  importPlacements: PlacementProps[] = [
    { value: 'CENTER', displayValue: 'Center' },
    { value: 'TOP_LEFT', displayValue: 'Top left corner' },
    { value: 'TOP', displayValue: 'Top' },
    { value: 'TOP_RIGHT', displayValue: 'Top right corner' },
    { value: 'RIGHT', displayValue: 'Right' },
    { value: 'BOTTOM_RIGHT', displayValue: 'Bottom right corner' },
    { value: 'BOTTOM', displayValue: 'Bottom' },
    { value: 'BOTTOM_LEFT', displayValue: 'Bottom left corner' },
    { value: 'LEFT', displayValue: 'Left' },
  ];

  importScales: ScaleProps[] = [
    { value: 'SHRINK', displayValue: 'Shrink large input to screen size' },
    { value: 'NONE', displayValue: 'None' },
  ];

  private _placement = signal<PlacementType>(this.importPlacements[0].value);
  private _scale = signal<ScaleType>(this.importScales[0].value);
  private _documentSource = signal<string>('oxytocin');
  private _isCheckedClear = signal<boolean>(true);
  private _isCheckedSelect = signal<boolean>(true);

  get placement(): PlacementType {
    return this._placement();
  }
  set placement(value: PlacementType) {
    this._placement.set(value);
  }

  get scale(): ScaleType {
    return this._scale();
  }
  set scale(value: ScaleType) {
    this._scale.set(value);
  }

  get documentSource(): string {
    return this._documentSource();
  }
  set documentSource(value: string) {
    this._documentSource.set(value);
  }

  get isCheckedClear(): boolean {
    return this._isCheckedClear();
  }
  set isCheckedClear(value: boolean) {
    this._isCheckedClear.set(value);
  }

  get isCheckedSelect(): boolean {
    return this._isCheckedSelect();
  }
  set isCheckedSelect(value: boolean) {
    this._isCheckedSelect.set(value);
  }

  async importDocument(): Promise<void> {
    if (!this.marvinRef) return;

    const options: ImportOptions = {
      clearCanvas: this.isCheckedClear,
      select: this.isCheckedSelect,
      scale: this.scale,
      placement: this.placement,
      throwError: true,
    };

    await this.marvinRef.importDocument(this.documentSource, options);
  }
}
