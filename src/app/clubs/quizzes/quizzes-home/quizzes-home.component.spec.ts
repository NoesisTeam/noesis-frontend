import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesHomeComponent } from './quizzes-home.component';

describe('QuizzesHomeComponent', () => {
  let component: QuizzesHomeComponent;
  let fixture: ComponentFixture<QuizzesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizzesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
