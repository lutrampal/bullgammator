import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireEditorComponent } from './wire-editor.component';

describe('WireEditorComponent', () => {
  let component: WireEditorComponent;
  let fixture: ComponentFixture<WireEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
