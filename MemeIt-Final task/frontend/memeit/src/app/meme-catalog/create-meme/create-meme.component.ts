import { Component, OnInit } from '@angular/core';
import { MemesService } from '../../services/memes.service';
import { Router } from '@angular/router';
import { MemeData } from 'src/app/data/meme-data';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {

  imageFile: File;
  titleOfImage: string;
  isHideTitleErr: boolean;
  isHideImageErr: boolean;

  constructor(private memeService: MemesService, private router: Router) {
    this.titleOfImage = '';
    this.isHideTitleErr = true;
    this.isHideImageErr = true;
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];
  }

  createMeme() {
    if (this.titleOfImage === '') {
      this.isHideTitleErr = false;
    } else {
      this.isHideTitleErr = true;
    }
    if (!this.imageFile) {
      this.isHideImageErr = false;
    } else {
      this.isHideImageErr = true;
    }
    if (this.titleOfImage !== '' && this.imageFile) {
      const newMeme = new MemeData();
      newMeme.setTitle(this.titleOfImage);
      this.memeService.create(newMeme, this.imageFile)
        .subscribe(
          (m: MemeData) => {
            if (m.title === newMeme.title) {
              this.router.navigate(['/memes']);
            } else {
              console.log('The meme not saved!');
            }
          }, (err) => {
            console.log(err);
          }
        );
    }
  }
}
