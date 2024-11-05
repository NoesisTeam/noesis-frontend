import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsHomeComponent } from './clubs-home.component';

describe('ClubsHomeComponent', () => {
  let component: ClubsHomeComponent;
  let fixture: ComponentFixture<ClubsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
