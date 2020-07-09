import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLifeCicleComponent } from './main-life-cicle.component';

describe('MainLifeCicleComponent', () => {
  let component: MainLifeCicleComponent;
  let fixture: ComponentFixture<MainLifeCicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLifeCicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLifeCicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
