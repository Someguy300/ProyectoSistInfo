import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileI } from '../models/file-i';
import { Product } from '../models/product';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  filePath: any;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { this.productsCollection = this.db.collection<Product>('productos'); }


  getAllProducts(): Observable<DocumentChangeAction<Product>[]> {
    return this.productsCollection.snapshotChanges();
  }

  createProduct(product: Product) {
    const productObj = {
      nombre: product.nombre,
      precio: product.precio,
      categoria: product.categoria,
      descripcion: product.descripcion,
      imageProduct: this.downloadURL,
      fileRef: this.filePath,
    };
    return this.productsCollection.add(productObj);
  }

  uploadImage(product: Product, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            console.log('URL_IMGEN', urlImage);
            console.log('PRODRUCTO', product);
            this.downloadURL = urlImage;
            this.createProduct(product);
          });
        })
      ).subscribe();
  }


  deleteProduct(docId: string): Promise<void> {
    return this.productsCollection.doc<Product>(docId).delete();
  }

}
