import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestockDialogComponent } from './restock-dialog.component';

describe('RestockDialogComponent', () => {
  let component: RestockDialogComponent;
  let fixture: ComponentFixture<RestockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestockDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
