import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsHelpComponent } from './instructions-help.component';

describe('InstructionsHelpComponent', () => {
  let component: InstructionsHelpComponent;
  let fixture: ComponentFixture<InstructionsHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
