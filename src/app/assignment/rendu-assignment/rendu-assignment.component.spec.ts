import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenduAssignmentComponent } from './rendu-assignment.component';

describe('RenduAssignmentComponent', () => {
  let component: RenduAssignmentComponent;
  let fixture: ComponentFixture<RenduAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenduAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenduAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
