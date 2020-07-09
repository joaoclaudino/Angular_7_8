import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from './models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection: AngularFirestoreCollection<Product> = this.afs.collection('products');
  constructor(private afs: AngularFirestore) { }


  getProducts():Observable<Product[]>{
    return this.productCollection.valueChanges();
  }
  addProduct(p: Product){
    const id=this.afs.createId();
    p.id=id;
    return this.productCollection.doc(id).set(p);
    // return this.productCollection.add(p);
  }

  deleteProduct(p: Product){
    return this.productCollection.doc(p.id).delete();
  }

  updateProduct(p: Product){
    return this.productCollection.doc(p.id).set(p);
  }

  searchByName(name: string): Observable<Product[]>{
    return this.afs.collection<Product>('products',
      ref => ref.orderBy('name').startAt(name).endAt(name+"utf8ff"))
      .valueChanges();
  }
}
