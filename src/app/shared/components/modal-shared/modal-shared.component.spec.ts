import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSharedComponent } from './modal-shared.component';

describe('ModalSharedComponent', () => {
  let component: ModalSharedComponent;
  let fixture: ComponentFixture<ModalSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
