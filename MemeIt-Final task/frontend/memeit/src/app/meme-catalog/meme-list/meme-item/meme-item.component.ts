import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MemeData } from 'src/app/data/meme-data';

@Component({
  selector: 'app-meme-item',
  templateUrl: './meme-item.component.html',
  styleUrls: ['./meme-item.component.css']
})
export class MemeItemComponent implements OnInit {

  @Input() meme: MemeData;
  @Input() hideButtonsControls: boolean;
  @Output() deleteCurrentMeme = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  editMeme() {
    const id = this.meme.id;
    this.router.navigate(['/edit', id]);
  }

  /**
   * Get id of the current image/meme and give it to the list component
   * @see meme-list.component.ts
   */
  deleteMeme() {
    const currentId = this.meme.id;
    this.deleteCurrentMeme.emit(currentId);
  }
}
