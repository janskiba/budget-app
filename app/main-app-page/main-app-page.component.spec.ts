import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppPageComponent } from './main-app-page.component';

describe('MainAppPageComponent', () => {
  let component: MainAppPageComponent;
  let fixture: ComponentFixture<MainAppPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAppPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
