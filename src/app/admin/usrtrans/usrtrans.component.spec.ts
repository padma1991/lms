import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrtransComponent } from './usrtrans.component';

describe('UsrtransComponent', () => {
  let component: UsrtransComponent;
  let fixture: ComponentFixture<UsrtransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrtransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrtransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
