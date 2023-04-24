import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItinariesComponent } from './my-itinaries.component';

describe('MyItinariesComponent', () => {
  let component: MyItinariesComponent;
  let fixture: ComponentFixture<MyItinariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyItinariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyItinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
