import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishItinariesComponent } from './publish-itinaries.component';

describe('PublishItinariesComponent', () => {
  let component: PublishItinariesComponent;
  let fixture: ComponentFixture<PublishItinariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishItinariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishItinariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
