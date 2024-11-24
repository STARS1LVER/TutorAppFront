import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSharedComponent } from './loader-shared.component';

describe('LoaderSharedComponent', () => {
  let component: LoaderSharedComponent;
  let fixture: ComponentFixture<LoaderSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
