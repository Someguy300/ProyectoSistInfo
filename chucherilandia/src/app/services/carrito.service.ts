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
import { BagService } from './bag.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carroCollection: AngularFirestoreCollection<Carrito>;

  carrito:Carrito = {
    bolsas : [],
    coste : 0,
  }

  constructor(private db: AngularFirestore, private bagService: BagService) { 
    this.carroCollection = this.db.collection<Carrito>('carritos');
  }

  getCarrito(id: string): Observable<Action<DocumentSnapshot<Carrito>>> {
    return this.carroCollection.doc<Carrito>(id).snapshotChanges();
  }

  addToCarrito(id: string, bolsa:Bolsa):void{
    this.getCarrito(id).subscribe((items) => {
      this.carrito = items.payload.data();
    });
    this.carrito.bolsas.push(bolsa);
    this.carrito.coste = 0;
    for (let bolsa of this.carrito.bolsas) {
      this.carrito.coste = this.carrito.coste + bolsa.costoTotal;
    }
    this.carroCollection.doc<Carrito>(id).set(this.carrito);
  }

  deleteBolsa(bolsa:Bolsa):void{
    this.getCarrito(auth().currentUser.uid).subscribe((items) => {
      this.carrito = items.payload.data();
    });
    
    console.log('preborrar',this.carrito)

    this.carrito.bolsas.forEach( (item, index) => {
      if(item === bolsa) this.carrito.bolsas.splice(index,1);
    });

    console.log('postborrar',this.carrito)
    this.carrito.coste = this.carrito.coste - bolsa.costoTotal;
    
    this.carroCollection.doc<Carrito>(auth().currentUser.uid).set(this.carrito);
    
  }

  

  createCarrito(id: string): any {
    return this.carroCollection.doc(id).set({
      bolsas: [],
      coste: 0});
  }

  updateCarrito(id: string): any {
    return this.carroCollection.doc(id).set({
      bolsas: [],
      coste: 0});
  }



  emptyCart(id: string) {
    this.carrito= {
      bolsas : [],
      coste : 0,
    };
    return this.carroCollection.doc<Carrito>(id).set(this.carrito);
  }


}
