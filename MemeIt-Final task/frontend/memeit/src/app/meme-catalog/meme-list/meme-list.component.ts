import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MemeData } from 'src/app/data/meme-data';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {

  @Input() memes: MemeData[];
  @Input()hideControls: boolean;
  @Output() memeDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Recive id of the current image/meme from meme-item
   * component and give it to the meme-catalog component
   * @param id of the current image/meme
   * @see meme-item.component.ts
   * @see meme-catalog.component.ts
   */
  buildNewMemes(id) {
    this.memeDelete.emit(id);
  }
}
