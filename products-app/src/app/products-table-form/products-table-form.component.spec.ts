import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTableFormComponent } from './products-table-form.component';

describe('ProductsTableFormComponent', () => {
  let component: ProductsTableFormComponent;
  let fixture: ComponentFixture<ProductsTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
