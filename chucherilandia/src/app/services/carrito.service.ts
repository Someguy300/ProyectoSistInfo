import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';
import { auth, User } from 'firebase';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Bolsa } from '../models/bolsa';
import { Product } from '../models/product';
import { ProdRef } from '../models/prod-ref';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carroCollection: AngularFirestoreCollection<Carrito>;

  constructor(private db: AngularFirestore) { 
    this.carroCollection = this.db.collection<Carrito>('carritos');
  }

  getCarrito(id: string): Observable<Action<DocumentSnapshot<Carrito>>> {
    return this.carroCollection.doc<Carrito>(id).snapshotChanges();
  }

  
  createCarrito(id: string): any {
    return this.carroCollection.doc(id).set({
      bolsas: Array,
      coste: 0});
  }

  


  emptyCart(data: Carrito, id: string) {
    data.coste = 0;
    data.bolsas = [];
    return this.carroCollection.doc<Carrito>(id).update(data);
  }


}
