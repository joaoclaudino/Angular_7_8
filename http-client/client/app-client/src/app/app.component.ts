import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Observer, Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app-client';

  simpleRqProductsObs$: Observable<Product[]>;
  productErrorHandling: Product[];
  productErrorLoading: Product[];
  productsIds: Product[];
  newlyProducts: Product[]=[];
  productsToDelete: Product[]=[];
  productsToEdit: Product[]=[];

  bLoading:boolean=false;
  constructor (
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){
  
  }
  ngOnInit(){
    
  }
  getSimpleHttpRequest(){
    // this.productsService.getProducts().subscribe(prods=>console.log(prods));
    this.simpleRqProductsObs$=this.productsService.getProducts();
  }

  getProductsWithErrorHandling(){
    this.productsService.getProductsError()
      .subscribe(
        (prods) => {this.productErrorHandling=prods;},
        (err)=>{
          console.log(err);
          console.log("Message: " + err.error.msg);
          console.log("Status Code: " + err.status);
          let config = new MatSnackBarConfig();
          config.duration=2000;
          config.panelClass=['snack_err'];
          if (err.status==0)
            this.snackBar.open('Could not conecct to the server!','',config);
          else
            this.snackBar.open(err.error.msg,'',config);
        }
      );
  }

  getProductsWithErrorHandlingOK(){
    this.productsService.getProductsDelay()
      .subscribe(
        (prods) => {
          this.productErrorHandling=prods;
          let config = new MatSnackBarConfig();
          config.duration=2000;
          config.panelClass=['snack_ok'];
          this.snackBar.open('Products successfully loaded!','',config);        
        },
        (err)=>{
          console.log(err);
        }
      );
  }

  getProductsLoading(){
    this.bLoading=true;
    this.productsService.getProductsDelay()
      .subscribe(
        (prods) => {
          this.productErrorLoading=prods;
          this.bLoading=false;
        },
        (err)=>{
          console.log(err);
          this.bLoading=false;
        }
      );    
  }

  getProductsIds(){
    this.productsService.getProductsIds()
      .subscribe((ids)=>{
        this.productsIds = ids.map(id => ({id:id, name:'', department:'',price:0}));
      })
  }

  loadName(id: string){
    // console.log('loadName');
    // console.log(id);
    this.productsService.getProductName(id)
      .subscribe( (name => {
        console.log(id);
        let index = this.productsIds.findIndex(p=>p._id===id);
        console.log(this.productsIds);
        console.log(index);
        if (index >=0 ){
          this.productsIds[index].name = name;
        }
      }));
  }


  saveProduct(name: string, department: string, price: number){
    console.log('saveProduct');
    let p = {name,department, price};
    this.productsService.saveProduct(p)
      .subscribe(
        (p: Product)=> {
          console.log(p);
          this.newlyProducts.push(p);
        },
        (err) => {
          console.log(err);
          let config = new MatSnackBarConfig();
          config.duration=2000;
          config.panelClass=['snack_err'];
          if (err.status==0)
            this.snackBar.open('Could not conecct to the server!','',config);
          else
            this.snackBar.open(err.error.msg,'',config);           
        }
      );
  }

  loadProductsToDelete(){
    this.productsService.getProducts()
      .subscribe((prods) => {
        console.log(prods);
        this.productsToDelete = prods
      });
  }
  deleteProduct(p: Product){
    console.log('deleteProduct');
    this.productsService.deleteProduct(p)
      .subscribe(
        (res) => {
          let i = this.productsToDelete.findIndex(prod=>p._id == prod._id);
          if (i>=0)
            this.productsToDelete.splice(i,1);
        },
        (err)=> {
          console.log(err);
        }
      )
  }
  loadProductsToEdit(){
    this.productsService.getProducts()
      .subscribe((prods) => {
        console.log(prods);
        this.productsToEdit = prods
      });    

  }

  editProduct(p: Product){
    // let newProduct: Product=Object.assign({},p);
    let newProduct: Product= {...p};
    let dialogRef = this.dialog.open(DialogEditProductComponent,{width: '400px',data: newProduct});
    dialogRef.afterClosed()
      .subscribe((res)=>{
          // console.log(res);
          if (res){
            this.productsService.editProduct(res)
            .subscribe(
              (res)=>{
                let i = this.productsToEdit.findIndex(prod=>p._id == prod._id);
                if (i>=0)
                  this.productsToEdit[i]=res;
              },
              (err)=>{

              }
            )
          }
      });
  }

}
