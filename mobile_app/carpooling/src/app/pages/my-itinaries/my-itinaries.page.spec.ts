import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyItinariesPage } from './my-itinaries.page';

describe('MyItinariesPage', () => {
  let component: MyItinariesPage;
  let fixture: ComponentFixture<MyItinariesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyItinariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
