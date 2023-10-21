import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectValidatorDocsComponent } from './object-validator-docs.component';

describe('ObjectValidatorComponent', () => {
  let component: ObjectValidatorDocsComponent;
  let fixture: ComponentFixture<ObjectValidatorDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjectValidatorDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectValidatorDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
