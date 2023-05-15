import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifiedMyItinariesPage } from './modified-my-itinaries.page';

describe('ModifiedMyItinariesPage', () => {
  let component: ModifiedMyItinariesPage;
  let fixture: ComponentFixture<ModifiedMyItinariesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifiedMyItinariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
