import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesModalComponent } from './files-modal.component';

describe('FilesModalComponent', () => {
  let component: FilesModalComponent;
  let fixture: ComponentFixture<FilesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesModalComponent]
    });
    fixture = TestBed.createComponent(FilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
