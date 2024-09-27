import { NgModule } from '@angular/core';
import { NgxUnivarsalTableComponent } from './ngx-univarsal-table.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [TableComponent,NgxUnivarsalTableComponent],   
  exports: [TableComponent]    
})
export class NgxUnivarsalTableModule {}
