import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetailHomeComponent } from './resource-detail-home.component';

describe('ResourceListDetailComponent', () => {
  let component: ResourceDetailHomeComponent;
  let fixture: ComponentFixture<ResourceDetailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDetailHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
