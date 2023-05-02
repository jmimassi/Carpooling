import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarEmptyComponent } from './topbar-empty.component';

describe('TopbarEmptyComponent', () => {
  let component: TopbarEmptyComponent;
  let fixture: ComponentFixture<TopbarEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
