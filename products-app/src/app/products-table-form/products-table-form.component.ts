import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-products-table-form',
  templateUrl: './products-table-form.component.html',
  styleUrls: ['./products-table-form.component.css']
})
export class ProductsTableFormComponent implements OnInit {

  @ViewChild(MatTable) datatable: MatTable<any>;
  products: Product[];
  prodColumns: string[]=["id","name","price","description","departament"];
  constructor(
      private productService: ProductService
    ) { }

  ngOnInit() {
    this.products=this.productService.getProduct();
    this.productService.onNewProduct.subscribe(
      (p) => {
        console.log(p);
        this.datatable.renderRows();
      }
    );
  }

}
