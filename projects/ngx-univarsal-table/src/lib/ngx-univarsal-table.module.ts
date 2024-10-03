import { NgModule } from '@angular/core';
import { NgxUnivarsalTableComponent } from './ngx-univarsal-table.component';
import { TableComponent } from './table/table.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [TableComponent,NgxUnivarsalTableComponent,FilterComponent],   
  exports: [TableComponent,FilterComponent]    
})
export class NgxUnivarsalTableModule {}
