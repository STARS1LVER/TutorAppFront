import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTutoringComponent } from './request-tutoring.component';

describe('RequestTutoringComponent', () => {
  let component: RequestTutoringComponent;
  let fixture: ComponentFixture<RequestTutoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestTutoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestTutoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
