import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from '../../projects/ngx-univarsal-table/src/lib/table/table.component';
import { FilterComponent } from '../../projects/ngx-univarsal-table/src/lib/filter/filter.component';

@NgModule({
    declarations: [ ],
    imports: [
        BrowserModule,
        TableComponent,
        FilterComponent        
    ],
    providers: [],
    bootstrap: []
  })
  export class AppModule { }