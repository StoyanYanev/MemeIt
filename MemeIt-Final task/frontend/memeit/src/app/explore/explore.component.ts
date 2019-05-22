import { Component, OnInit, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Domain } from '../data/domain';
import { MemeData } from '../data/meme-data';
import { DomainService } from '../services/domain.service';
import { Search } from '../data/search';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, DoCheck {

  allDomains: Domain[] = [];
  currentDomainMemes: MemeData[] = [];
  selectedDomain: string;
  closestTerm: string;
  isHideParagraphSuggest: boolean;
  isHideParagraphAll: boolean;
  suggest: string;
  s: Search;
  private searchDiffer: KeyValueDiffer<string, any>;

  constructor(private domainService: DomainService, private differs: KeyValueDiffers) {
    this.closestTerm = '';
    this.isHideParagraphSuggest = true;
    this.isHideParagraphAll = true;
    this.selectedDomain = '';
    this.suggest = 'No';
  }

  ngOnInit() {
    this.domainService.getAllDomains().subscribe(domains => this.allDomains = domains);
    this.s = new Search();
    this.searchDiffer = this.differs.find(this.s).create();
  }

  getSheredMemes() {
    if (this.selectedDomain !== '') {
      this.domainService.getDomainMemes(this.selectedDomain).subscribe(memes => this.currentDomainMemes = memes);
      this.isHideParagraphAll = true;
    }
  }

  ngDoCheck(): void {
    const changes = this.searchDiffer.diff(this.s);
    if (changes) {
      if (this.suggest !== 'No') {
        this.isHideParagraphSuggest = false;
      } else {
        this.isHideParagraphSuggest = true;
        this.currentDomainMemes = this.s.foundMemes;
        this.isHideParagraphAll = false;
      }
    }
  }

  /**
   * Finds the closest matched title if it is not found give suggestion
   * Levenshtein algorithm is used
   */
  findTheClosestMatch() {
    if (this.closestTerm !== '') {
      const term = this.closestTerm;
      this.domainService.getClosestTitle(term).subscribe(t => {
        this.suggest = t.suggestion;
        this.s = t;
      });
    }
  }

  getTerm() {
    this.isHideParagraphSuggest = true;
    this.currentDomainMemes = this.s.foundMemes;
    this.isHideParagraphAll = false;
  }

  getAll() {
    this.getSheredMemes();
  }
}
