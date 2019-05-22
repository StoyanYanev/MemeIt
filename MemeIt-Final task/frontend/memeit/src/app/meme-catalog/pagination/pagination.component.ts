import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() collectionSize: number; // all items
  @Input() pageSize: number; // items per page
  @Input() maxSize: number; // The maximum number of pages to display
  @Input() page: number; // current page

  @Output() changePage = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    this.changePage.emit(this.page);
  }
}
