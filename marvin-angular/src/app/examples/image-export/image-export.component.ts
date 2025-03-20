import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  WritableSignal,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marvin, ExportOptions, ImageType } from '@chemaxon/marvin';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-export',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, JsonPipe],
  templateUrl: './image-export.component.html',
  styleUrls: ['../examples.component.scss'],
})
export class ImageExportComponent {
  @Input() marvinRef?: Marvin;
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

  constructor(private sanitizer: DomSanitizer) {}

  imageFormats: ImageType[] = ['SVG', 'PNG', 'JPG', 'WEBP', 'TIFF'];
  format: WritableSignal<ImageType> = signal(this.imageFormats[0]);
  exportOptions: WritableSignal<ExportOptions | null> = signal(null);
  result: WritableSignal<string> = signal('');
  image: WritableSignal<string | undefined> = signal(undefined);
  sanitizedSvg: WritableSignal<SafeHtml | null> = signal(null); // For safe SVG rendering
  width: WritableSignal<number> = signal(230);
  height: WritableSignal<number> = signal(230);

  async exportImage(): Promise<void> {
    if (!this.marvinRef) return;

    const options: ExportOptions = {
      width: this.width(),
      height: this.height(),
    };
    this.exportOptions.set(options);

    const exportedImage = await this.marvinRef.exportImage(
      this.format(),
      options
    );
    if (exportedImage) {
      this.image.set(exportedImage.content);
      this.result.set(exportedImage.content ?? '');

      if (this.format() === 'SVG') {
        this.sanitizedSvg.set(
          this.sanitizer.bypassSecurityTrustHtml(exportedImage.content)
        );
      } else {
        this.sanitizedSvg.set(null);
      }
    }
  }

  async downloadImage(): Promise<void> {
    if (!this.marvinRef || !this.downloadLink) return;

    const options: ExportOptions = {
      width: this.width(),
      height: this.height(),
    };
    const exportedImage = await this.marvinRef.exportImage(
      this.format(),
      options
    );
    this.result.set(exportedImage?.content ?? '');

    const link = this.downloadLink.nativeElement;
    link.href =
      this.format() === 'SVG'
        ? 'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(this.result())
        : this.result();
    link.download = `fileName.${this.format().toLowerCase()}`;
    link.click();
  }

  updateFormat(selectedFormat: ImageType): void {
    this.format.set(selectedFormat);
  }

  updateWidth(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!isNaN(value)) this.width.set(value);
  }

  updateHeight(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!isNaN(value)) this.height.set(value);
  }
}
