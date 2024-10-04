import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild ,EventEmitter, Input,  Output,SimpleChanges, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() gtColumnList: any[] = [];
  @Input() rowData: any[] = [];
  @Input() itemPerPage: number = 10;
  @Input() showCheckBox: boolean = false;
  @Output() onChecked = new EventEmitter<any>();
  page:number=1;

  selectAll: boolean = false;

  constructor() {}
  ngOnInit(){

  }
  ngOnChanges(changes: SimpleChanges): void{  
    this.convertDot2Values();
  }
  convertDot2Values() {
    for (let col of this.gtColumnList) {
      col.size = col.checked == false?0:col.size;
      if (col.field.includes('.')) {
        col.field.split('.').forEach((key: any,index: string)=>{
          col['field'+index] = key;
        })
      }
    }
  }
  checkAll() {
    for(let row of this.rowData){
      row.checked = this.selectAll;
    }
   this.onCheckRow();
  }
  onCheckRow() {
   this.onChecked.emit(this.rowData.filter(x=> x.checked));
  }
 
}
