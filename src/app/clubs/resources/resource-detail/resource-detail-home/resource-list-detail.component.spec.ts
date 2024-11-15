import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceListDetailComponent } from './resource-list-detail.component';

describe('ResourceListDetailComponent', () => {
  let component: ResourceListDetailComponent;
  let fixture: ComponentFixture<ResourceListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceListDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
