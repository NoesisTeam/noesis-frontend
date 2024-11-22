import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalListComponent } from './medal-list.component';

describe('MedalListComponent', () => {
  let component: MedalListComponent;
  let fixture: ComponentFixture<MedalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
