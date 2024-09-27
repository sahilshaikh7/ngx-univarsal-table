import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  people = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'London' },
    { name: 'Mark', age: 35, city: 'Berlin' },
  ];

}
