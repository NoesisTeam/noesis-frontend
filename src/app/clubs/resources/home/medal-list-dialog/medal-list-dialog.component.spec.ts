import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalListDialogComponent } from './medal-list-dialog.component';

describe('MedalListDialogComponent', () => {
  let component: MedalListDialogComponent;
  let fixture: ComponentFixture<MedalListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedalListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedalListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
