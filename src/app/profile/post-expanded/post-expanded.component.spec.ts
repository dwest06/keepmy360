import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExpandedComponent } from './post-expanded.component';

describe('PostExpandedComponent', () => {
  let component: PostExpandedComponent;
  let fixture: ComponentFixture<PostExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostExpandedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
