import { Component, OnInit, Input } from '@angular/core';
import { MemesService } from 'src/app/services/memes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MemeData } from 'src/app/data/meme-data';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.css']
})
export class EditMemeComponent implements OnInit {

  @Input() meme: MemeData;
  currentId: number;
  imageFile: File;
  isHideTitleErr: boolean;
  titleOfCurrentImage: string;

  constructor(private memesService: MemesService,
              private activatedRoute: ActivatedRoute, private location: Location) {
    this.isHideTitleErr = true;
    this.titleOfCurrentImage = '';
  }

  ngOnInit() {
    this.getMeme();
  }

  getMeme() {
    this.currentId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.memesService.getMemeById(this.currentId).subscribe(
      item => {
        this.meme = item;
        this.titleOfCurrentImage = item.title;
      }
    );
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];
  }

  goBack() {
    this.location.back();
  }

  editCurrentMeme(newTitle: string) {
    if (newTitle === '') {
      this.isHideTitleErr = false;
    } else {
      this.isHideTitleErr = true;
      this.meme.title = newTitle;
      this.memesService.update(this.meme, this.imageFile).subscribe(() => this.goBack());
    }
  }
}
