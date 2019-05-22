import { Component, OnInit } from '@angular/core';
import { MemesService } from '../services/memes.service';
import { MemeData } from '../data/meme-data';

@Component({
  selector: 'app-meme-catalog',
  templateUrl: './meme-catalog.component.html',
  styleUrls: ['./meme-catalog.component.css']
})
export class MemeCatalogComponent implements OnInit {

  memes: MemeData[] = [];
  memesPerPage: number; // Memes per page
  allMemes: number; // Number of all images
  maxSize: number; // The maximum number of pages to display
  currentPage: number;
  term: string;

  constructor(private memeService: MemesService) {
    this.currentPage = 1;
    this.memesPerPage = 6; // default
    this.getNumbersOfAllMemes();
    this.maxSize = this.getAllPages(this.allMemes);
  }

  ngOnInit() {
    this.pagedMeme();
  }

  /**
   * Change the number of memes after deletion
   */
  changeNumberOfMemes() {
    this.getNumbersOfAllMemes();
  }

  changeMemesPerPage(val) {
    this.memesPerPage = val;
    this.pagedMeme();
  }

  changeCurrentPage(data) {
    this.currentPage = data;
    this.pagedMeme();
  }

  getAllPages(all: number) {
    const pages = all / this.memesPerPage;
    if (pages <= 1) {
      return 1;
    }
    return pages;
  }

  /**
   * Get the number of memes
   */
  getNumbersOfAllMemes() {
    this.memeService.getNumberOfMemes().subscribe(item => { this.allMemes = item; });
  }

  /**
   * Get all memes from database
   */
  getMemes() {
    this.memeService.getAllMemes().subscribe(img => {
      this.memes = img;
    });
  }

  /**
   * Recive id of the current image/meme from meme-list component
   * change the number of pages and get the new meme from the database
   * @param id of the deleted image/meme
   * @see meme-list.component.ts
   */
  loadNewMemes(id: number) {
    this.allMemes -= 1;
    this.maxSize = this.getAllPages(this.allMemes);
    this.memeService.delete(id).subscribe(() => this.pagedMeme());
  }

  /**
   * Get specific number(defined from the variable memesPerPage) of images/memes
   */
  pagedMeme() {
    this.memeService.pagedMemes(this.currentPage, this.memesPerPage).subscribe(img => {
      this.memes = img;
    });
  }

  /**
   * Filtered all items/memes by title and show them on one page
   */
  filteredItems() {
    if (!this.term) {
      this.getNumbersOfAllMemes();
      this.maxSize = this.getAllPages(this.allMemes);
      this.pagedMeme();
    } else {
      // Show all memes on one page
      this.memeService.filteredMemes(this.term).subscribe(img => {
        this.memes = img;
      });
      this.maxSize = 1;
      this.currentPage = 1;
      this.allMemes = 1;
    }
  }
}
