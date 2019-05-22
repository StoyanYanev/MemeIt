import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCatalogComponent } from './meme-catalog.component';

describe('MemeCatalogComponent', () => {
  let component: MemeCatalogComponent;
  let fixture: ComponentFixture<MemeCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
