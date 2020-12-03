import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';
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

  prodRef: ProdRef;
  auxNewBolsa: Bolsa;
  bolsasEqPrice: boolean;

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

  addToCart(data: Carrito, id: string, prod:Product, qty:number): Promise<void> {
    this.reset();
    this.prodRef.cantidad = qty;
    this.prodRef.precio = qty*prod.precio;
    this.prodRef.prodId = prod.$key;
    for(let bolsa of data.bolsas){
      if(bolsa.setPrecio==prod.precio){
        this.bolsasEqPrice = true;
        bolsa.contenido.push(this.prodRef);
      }
    }
    if(!this.bolsasEqPrice){
      this.auxNewBolsa.setPrecio = prod.precio;
      this.auxNewBolsa.coste = this.prodRef.precio;
      this.auxNewBolsa.contenido.push(this.prodRef)
      data.bolsas.push(this.auxNewBolsa);
    }
    return this.carroCollection.doc<Carrito>(id).update(data);
  }


  emptyCart(data: Carrito, id: string) {
    data.coste = 0;
    data.bolsas = [];
    return this.carroCollection.doc<Carrito>(id).update(data);
  }

  reset(){
    this.bolsasEqPrice= false;
  }

}
