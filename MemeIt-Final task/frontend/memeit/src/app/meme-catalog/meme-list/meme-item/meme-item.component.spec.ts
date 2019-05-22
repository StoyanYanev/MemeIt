import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeItemComponent } from './meme-item.component';

describe('MemeItemComponent', () => {
  let component: MemeItemComponent;
  let fixture: ComponentFixture<MemeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
