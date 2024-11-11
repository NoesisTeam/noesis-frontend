import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClubDialogComponent } from './create-club-dialog.component';

describe('CreateClubDialogComponent', () => {
  let component: CreateClubDialogComponent;
  let fixture: ComponentFixture<CreateClubDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClubDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateClubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
