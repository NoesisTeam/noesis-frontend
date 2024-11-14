import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesHomeComponent } from './resources-home.component';

describe('ResourcesHomeComponent', () => {
  let component: ResourcesHomeComponent;
  let fixture: ComponentFixture<ResourcesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
