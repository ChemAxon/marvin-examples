import { Component, Input } from '@angular/core';
import { Marvin } from '@chemaxon/marvin';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageExportComponent } from './image-export/image-export.component';
import { DocumentExportComponent } from './document-export/document-export.component';
import { DocumentImportComponent } from './document-import/document-import.component';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    DocumentExportComponent,
    DocumentImportComponent,
    ImageExportComponent,
  ],
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
})
export class ExamplesComponent {
  @Input() marvinRef?: Marvin;

  selectedExample = 'documentExport';

  examples = [
    { displayValue: 'Document export', value: 'documentExport' },
    { displayValue: 'Document import', value: 'documentImport' },
    { displayValue: 'Image export', value: 'imageExport' },
  ];
}
