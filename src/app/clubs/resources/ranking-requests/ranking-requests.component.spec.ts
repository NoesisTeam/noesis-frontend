import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingRequestsComponent } from './ranking-requests.component';

describe('RankingRequestsComponent', () => {
  let component: RankingRequestsComponent;
  let fixture: ComponentFixture<RankingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
