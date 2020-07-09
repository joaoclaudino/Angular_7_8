import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  filterProducts$: Observable<Product[]>;

  displayedColumns=['name','price','stock','operations'];
  
  @ViewChild('name') productName: ElementRef;


  productForm=this.fb.group({
    id:[undefined],
    name:['',Validators.required],
    stock:[0,Validators.required],
    price:[0,Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }


  onSubmit(){
    let p: Product = this.productForm.value;
    if (!p.id){
      this.addProduct(p);
    }else{
      this.updateProduct(p);
    }
  }
  addProduct(p: Product){
    this.productService.addProduct(p)
      .then(
        ()=>{
          this.snackBar.open('Product Added.','OK',{duration: 2000})
          this.productForm.reset({name:'',stock:0, price:0,id: undefined});
          this.productName.nativeElement.focus();
        })
        .catch(()=>{
          this.snackBar.open('Error on submiting the product','OK',{duration: 2000})
        })
  }

  updateProduct(p: Product){
    this.productService.updateProduct(p)
    .then(
      ()=>{
        this.snackBar.open('Product has benn Updated.','OK',{duration: 2000})
        this.productForm.reset({name:'',stock:0, price:0,id: undefined});
        this.productName.nativeElement.focus();
      })
      .catch(()=>{
        this.snackBar.open('Error when trying update the product','OK',{duration: 2000})
      })    
  }  

  edit(p:Product){
    this.productForm.setValue(p);
  }
  del(p:Product){
    this.productService.deleteProduct(p)
    .then(
      ()=>{
        this.snackBar.open('Product has benn removed.','OK',{duration: 2000})
        // this.productForm.reset({name:'',stock:0, price:0,id: undefined});
        // this.productName.nativeElement.focus();
      })
      .catch(()=>{
        this.snackBar.open('Error when trying remove the product','OK',{duration: 2000})
      })     
  }

  filter(event){
    this.filterProducts$= this.productService.searchByName(event.target.value);
    // console.log(event);
  }
}
