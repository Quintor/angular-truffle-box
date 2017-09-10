import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaSenderComponent } from './meta-sender.component';

describe('MetaSenderComponent', () => {
  let component: MetaSenderComponent;
  let fixture: ComponentFixture<MetaSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
