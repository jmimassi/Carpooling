import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinariesComponent } from './itinaries.component';

describe('ItinariesComponent', () => {
  let component: ItinariesComponent;
  let fixture: ComponentFixture<ItinariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
