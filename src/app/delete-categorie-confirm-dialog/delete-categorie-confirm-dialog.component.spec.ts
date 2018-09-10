import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategorieConfirmDialogComponent } from './delete-categorie-confirm-dialog.component';

describe('DeleteCategorieConfirmDialogComponent', () => {
  let component: DeleteCategorieConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteCategorieConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCategorieConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCategorieConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
