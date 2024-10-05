import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'rendererUt',
  standalone: true
})
export class RendererUtPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // transform(value: string, ...args: any[]): any {
  //   return args[1](args[0], value);
  // }

  transform(value: unknown, ...args: any[]): SafeHtml {
    console.log(args[0], args[1])
    return this.sanitizer.bypassSecurityTrustHtml(args[1](args[0], value));
  }

}
