import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemeComponent } from './edit-meme.component';

describe('EditMemeComponent', () => {
  let component: EditMemeComponent;
  let fixture: ComponentFixture<EditMemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
