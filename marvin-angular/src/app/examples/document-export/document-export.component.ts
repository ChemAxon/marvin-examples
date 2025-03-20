import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Marvin, DocumentType } from '@chemaxon/marvin';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormatProps {
  value: DocumentType;
  displayValue: string;
}

@Component({
  selector: 'app-document-export',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './document-export.component.html',
  styleUrls: ['../examples.component.scss'],
})
export class DocumentExportComponent {
  @Input() marvinRef?: Marvin;

  exportFormats: FormatProps[] = [
    { value: 'CXON', displayValue: 'CXON' },
    { value: 'MRV', displayValue: 'MRV' },
    { value: 'Mol:V2', displayValue: 'MDL MOLFILE' },
    { value: 'Mol:V3', displayValue: 'MDL MOLFILE V3000' },
    { value: 'SMILES', displayValue: 'SMILES' },
    { value: 'SMARTS', displayValue: 'SMARTS' },
    { value: 'InChI', displayValue: 'InChI' },
    { value: 'InChIKey', displayValue: 'InChIkey' },
    { value: 'SDF', displayValue: 'MDL SDfile format' },
    { value: 'RDF', displayValue: 'MDL RDfile format' },
    { value: 'RXN', displayValue: 'MDL RXNfile format' },
  ];

  format: WritableSignal<DocumentType> = signal(this.exportFormats[0].value);
  result: WritableSignal<string | undefined> = signal(undefined);

  async exportDocument(): Promise<void> {
    try {
      const exportedDocument = await this.marvinRef?.exportDocument(
        this.format()
      );
      this.result.set(exportedDocument?.content);
    } catch (e) {
      this.result.set(
        '<div style="color:red;margin:5px">Could not export in requested format</div>'
      );
    }
  }

  updateFormat(newFormat: DocumentType) {
    this.format.set(newFormat);
  }
}
