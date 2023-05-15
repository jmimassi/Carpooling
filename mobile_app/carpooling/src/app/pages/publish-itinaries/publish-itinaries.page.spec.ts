import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishItinariesPage } from './publish-itinaries.page';

describe('PublishItinariesPage', () => {
  let component: PublishItinariesPage;
  let fixture: ComponentFixture<PublishItinariesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublishItinariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
