import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMapperDocsComponent } from './auto-mapper-docs.component';

describe('AutoMapperTestComponent', () => {
  let component: AutoMapperDocsComponent;
  let fixture: ComponentFixture<AutoMapperDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoMapperDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoMapperDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
