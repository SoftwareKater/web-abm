import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAbmComponent } from './ngx-abm.component';

describe('NgxAbmComponent', () => {
  let component: NgxAbmComponent;
  let fixture: ComponentFixture<NgxAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
