import { Injectable } from '@angular/core';
import { MemeData } from '../data/meme-data';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemesService {

  constructor(private requests: RequestService) { }

  create(meme: MemeData, image: File): Observable<MemeData> {
    const data = this.formDataBuilder(meme.title, image);
    return this.requests.createMeme(data);
  }

  getMemeById(id: number): Observable<MemeData> {
    return this.requests.getMeme(id);
  }

  pagedMemes(page: number, memesPerPage: number): Observable<MemeData[]> {
    return this.requests.pagedMemes(page, memesPerPage);
  }

  getAllMemes(): Observable<MemeData[]> {
    return this.requests.getAllMemes();
  }

  update(meme: MemeData, image: File): Observable<MemeData> {
    const data = this.formDataBuilder(meme.title, image);
    return this.requests.updateMeme(meme.id, data);
  }

  delete(id: number): Observable<MemeData> {
    return this.requests.deleteMeme(id);
  }

  getNumberOfMemes(): Observable<any> {
    return this.requests.getNumberOfRecords();
  }

  filteredMemes(term: string): Observable<MemeData[]> {
    return this.requests.filteredAllMemes(term);
  }

  formDataBuilder(title: string, image: File) {
    const dataBuilder = new FormData();
    dataBuilder.append('title', title);
    dataBuilder.append('file', image);
    return dataBuilder;
  }
}
