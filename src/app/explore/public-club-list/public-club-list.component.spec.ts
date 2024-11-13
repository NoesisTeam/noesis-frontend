import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubListComponent } from './public-club-list.component';

describe('PublicClubListComponent', () => {
  let component: PublicClubListComponent;
  let fixture: ComponentFixture<PublicClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicClubListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
