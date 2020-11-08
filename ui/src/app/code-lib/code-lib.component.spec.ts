import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeLibComponent } from './code-lib.component';

describe('CodeLibComponent', () => {
  let component: CodeLibComponent;
  let fixture: ComponentFixture<CodeLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
