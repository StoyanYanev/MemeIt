import { Component, OnInit, ViewChild } from '@angular/core';
import { MemeData } from '../data/meme-data';
import { MemesService } from '../services/memes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  defautX = 250;
  defautY = 250;
  titleOfImage: string;
  isHideTitleErr: boolean;
  rows: number;
  cols: number;
  i: Array<number> = [];
  j: Array<number> = [];
  currentX: number;
  currentY: number;
  currentCol: number;
  currentRow: number;
  @ViewChild('canvas') canvas;
  private context: CanvasRenderingContext2D;


  constructor(private memeService: MemesService, private router: Router) {
    this.titleOfImage = '';
    this.isHideTitleErr = true;
    this.rows = 1;
    this.cols = 1;
    this.i = new Array(this.rows);
    this.j = new Array(this.cols);
  }

  ngOnInit() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  showImageInCanvas(val) {
    this.positionOfCurrentItem();
    const file = val.target.files[0];
    const img = new Image();
    const rendered = new FileReader();
    rendered.readAsDataURL(file);
    rendered.onload = () => {
      img.src = rendered.result as string;
      img.onload = () => {
        this.context.drawImage(img, this.currentX, this.currentY, this.defautX, this.defautY);
      };
    };
  }

  setCurrentRowsAndCols(r, c) {
    this.currentRow = r;
    this.currentCol = c;
  }

  getImage(val, r, c) {
    this.setCurrentRowsAndCols(r, c);
    this.showImageInCanvas(val);
  }

  showTextInCanvas(val, r, c) {
    this.setCurrentRowsAndCols(r, c);
    this.positionOfCurrentItem();
    this.context.font = '40px serif';
    this.context.strokeText(val, this.currentX, this.currentY + 50);
  }

  positionOfCurrentItem() {
    if (this.currentRow === 0 && this.currentCol === 0) {
      this.currentX = 0;
      this.currentY = 0;
    } else if (this.currentRow === 1 && this.currentCol === 0) {
      this.currentX = 0;
      this.currentY = this.defautY;
    } else if (this.currentRow === 0 && this.currentCol === 1) {
      this.currentX = this.defautX;
      this.currentY = 0;
    } else if (this.currentRow === 1 && this.currentCol === 1) {
      this.currentX = this.defautX;
      this.currentY = this.defautY;
    }
  }

  changeRows() {
    if (this.rows >= 1 && this.rows <= 2) {
      this.i = new Array(this.rows);
    }
  }

  changeCols() {
    if (this.cols >= 1 && this.cols <= 2) {
      this.j = new Array(this.cols);
    }
  }

  saveNewMeme() {
    if (this.titleOfImage === '') {
      this.isHideTitleErr = false;
    } else {
      this.isHideTitleErr = true;
      const newMeme = new MemeData();
      newMeme.setTitle(this.titleOfImage);
      const file = this.convertCanvasToBlob();
      this.memeService.create(newMeme, file).subscribe(
        (m: MemeData) => {
          if (m.title === newMeme.title) {
            this.router.navigate(['/memes']);
          } else {
            console.log('The meme not saved!');
          }
        });
    }
  }

  /**
   * Clear canvas
   */
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  convertCanvasToBlob(): any {
    const img = this.canvas.toDataURL();
    const blob = this.dataURItoBlob(img);
    return blob;
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: 'image/jpg' });
  }
}
