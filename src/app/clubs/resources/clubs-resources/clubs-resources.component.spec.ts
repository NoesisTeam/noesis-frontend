import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsResourcesComponent } from './clubs-resources.component';

describe('ClubsResourcesComponent', () => {
  let component: ClubsResourcesComponent;
  let fixture: ComponentFixture<ClubsResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubsResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
