import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ClimbOnBoardPage } from './climb-on-board.page';

describe('ClimbOnBoardPage', () => {
  let component: ClimbOnBoardPage;
  let fixture: ComponentFixture<ClimbOnBoardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClimbOnBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
