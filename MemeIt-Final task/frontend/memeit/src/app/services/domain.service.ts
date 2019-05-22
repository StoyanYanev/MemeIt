import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemeData } from '../data/meme-data';
import { Domain } from '../data/domain';
import { Search } from '../data/search';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private baseUrl = '/';

  constructor(private http: HttpClient) { }

  getAllDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.baseUrl}domains`);
  }

  getDomainMemes(domain: string): Observable<MemeData[]> {
    return this.http.get<MemeData[]>(`${this.baseUrl}domainMemes/${domain}`);
  }

  getClosestTitle(term: string): Observable<Search> {
    return this.http.get<Search>(`${this.baseUrl}closestMatch/${term}`);
  }
}
