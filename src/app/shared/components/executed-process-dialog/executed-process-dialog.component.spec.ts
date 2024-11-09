import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedProcessDialogComponent } from './executed-process-dialog.component';

describe('ExecutedProcessDialogComponent', () => {
  let component: ExecutedProcessDialogComponent;
  let fixture: ComponentFixture<ExecutedProcessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutedProcessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutedProcessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
