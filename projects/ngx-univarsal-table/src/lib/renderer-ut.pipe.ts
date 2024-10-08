import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'rendererUt',
  standalone: true
})
export class RendererUtPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown, ...args: any[]): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(args[1](args[0], value));
  }

}
