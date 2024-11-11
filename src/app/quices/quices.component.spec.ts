import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicesComponent } from './quices.component';

describe('QuicesComponent', () => {
  let component: QuicesComponent;
  let fixture: ComponentFixture<QuicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
