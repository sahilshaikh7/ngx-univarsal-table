import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {
  buyersList = [
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'abhishekvishwa...', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Hot', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'sushmaravuru9019@gmail.com', lastModified: '25 Sep 12:50', lastBidded: '25 Sep 12:50' },
    { buyerId: 'abhishekvishwa...', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Hot', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'sushmaravuru9019@gmail.com', lastModified: '25 Sep 12:50', lastBidded: '25 Sep 12:50' },
    { buyerId: 'abhishekvishwa...', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Hot', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'sushmaravuru9019@gmail.com', lastModified: '25 Sep 12:50', lastBidded: '25 Sep 12:50' },
    { buyerId: 'abhishekvishwa...', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Hot', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'sushmaravuru9019@gmail.com', lastModified: '25 Sep 12:50', lastBidded: '25 Sep 12:50' },
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'ranju_nuox', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Open', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'blubirch.derc@gmail.com', lastModified: '25 Sep 12:53', lastBidded: '25 Sep 12:53' },
    { buyerId: 'abhishekvishwa...', categories: 'Electronics and Appliances,Fashion and Style,IT,Others', status: 'Active', stage: 'Hot', city: 'Indore', state: 'Madhya Pradesh', disposition: 'Won', executive: 'sushmaravuru9019@gmail.com', lastModified: '25 Sep 12:50', lastBidded: '25 Sep 12:50' },
  ];

  @ViewChild('mainTable', { static: false }) mainTable!: ElementRef;
  startX!: number;
  startWidth!: number;
  pressed!: boolean;
  currentHandle!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.mainTable) {
      console.error('mainTable is undefined');
      return;
    }

    const headers = this.mainTable.nativeElement.querySelectorAll('th');
    headers.forEach((header: HTMLElement) => {
      const resizeHandle = header.querySelector('.resize-handle');
      if (resizeHandle) {
        this.renderer.listen(resizeHandle, 'mousedown', (event: MouseEvent) => this.onMouseDown(event, header));
      }
    });

    // Handle mousemove and mouseup at the document level
    this.renderer.listen(document, 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
    this.renderer.listen(document, 'mouseup', () => this.onMouseUp());
  }

  onMouseDown(event: MouseEvent, header: HTMLElement) {
    this.pressed = true;
    this.startX = event.pageX;
    this.currentHandle = header;
    this.startWidth = this.currentHandle.offsetWidth;

    // Add class to indicate resizing is happening
    const table = this.mainTable.nativeElement;
    this.renderer.addClass(table, 'resizing');
  }

  onMouseMove(event: MouseEvent) {
    if (this.pressed && this.currentHandle) {
      const newWidth = this.startWidth + (event.pageX - this.startX);

      if (newWidth > 30) { // Ensure the width doesn't shrink too much
        this.renderer.setStyle(this.currentHandle, 'width', `${newWidth}px`);

        // Adjust the table's width to accommodate the new column width
        const table = this.mainTable.nativeElement;
        const tableWidth = table.offsetWidth;
        const newTableWidth = tableWidth + (event.pageX - this.startX);
        this.renderer.setStyle(table, 'width', `${newTableWidth}px`);
      }
    }
  }

  onMouseUp() {
    if (this.pressed) {
      const table = this.mainTable.nativeElement;
      this.renderer.removeClass(table, 'resizing');
      this.pressed = false;
    }
  }

  // Optional: Reset column sizes on double-click
  resetColumnSizes() {
    const headers = this.mainTable.nativeElement.querySelectorAll('th');
    headers.forEach((header: HTMLElement) => {
      this.renderer.removeStyle(header, 'width');
    });
  }
}
