import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItinariesPage } from './itinaries.page';

describe('ItinariesPage', () => {
  let component: ItinariesPage;
  let fixture: ComponentFixture<ItinariesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItinariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
