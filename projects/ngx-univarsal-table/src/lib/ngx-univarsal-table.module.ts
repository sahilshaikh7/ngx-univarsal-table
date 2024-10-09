import { UniversalTableComponent } from './universal-table/universal-table.component';
import { NgModule } from '@angular/core';
import { NgxUnivarsalTableComponent } from './ngx-univarsal-table.component';
import { TableComponent } from './table/table.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [TableComponent,NgxUnivarsalTableComponent,FilterComponent,UniversalTableComponent],   
  exports: [TableComponent,FilterComponent,UniversalTableComponent]    
})
export class NgxUnivarsalTableModule {}
