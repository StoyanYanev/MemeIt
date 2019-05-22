import { Injectable } from '@angular/core';
import { MemeData } from '../data/meme-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = '/';

  constructor(private http: HttpClient) { }

  createMeme(data: FormData) {
    return this.http.post<MemeData>(`${this.baseUrl}create`, data);
  }

  getMeme(id: number) {
    return this.http.get<MemeData>(`${this.baseUrl}find/${id}`);
  }

  updateMeme(id: number, value: FormData) {
    return this.http.put<MemeData>(`${this.baseUrl}update/${id}`, value);
  }

  deleteMeme(id: number) {
    return this.http.delete<MemeData>(`${this.baseUrl}delete/${id}`);
  }

  getAllMemes() {
    return this.http.get<MemeData[]>(`${this.baseUrl}meme`);
  }

  getNumberOfRecords() {
    return this.http.get(`${this.baseUrl}numberOfRecords`);
  }

  pagedMemes(page: number, memesPerPage: number) {
    return this.http.get<MemeData[]>(`${this.baseUrl}memes/${page}/${memesPerPage}`);
  }

  filteredAllMemes(term: string) {
    return this.http.post<MemeData[]>(`${this.baseUrl}filtered`, term);
  }
}
