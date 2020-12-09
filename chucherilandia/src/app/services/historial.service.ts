import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, DocumentReference, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historialCollection: AngularFirestoreCollection<Order>;

  constructor(private db: AngularFirestore) {
    this.historialCollection = this.db.collection<Order>('historial');
  }

  /**
   * GET ALL ORDERS
   */
  getHistorialOrders(): Observable<DocumentChangeAction<Order>[]> {
    return this.historialCollection.snapshotChanges();
  }

  /**
   * GET ORDER BY ID
   * @param orderId
   */
  getOrderDelHistorial(orderId: string): Observable<Action<DocumentSnapshot<Order>>> {
    return this.historialCollection.doc<Order>(orderId).snapshotChanges();
  }

  /**
   * CREATE NEW ORDER
   * @param newOrder
   */
  createOrderEnHistorial(newOrder: Order): Promise<DocumentReference> {
    return this.historialCollection.add(newOrder);
  }

  /**
   * UPDATE SELECTED ORDER
   * @param data
   * @param docId
   */
  updateOrderDelHistorial(data: Order, docId: string): Promise<void> {
    return this.historialCollection.doc<Order>(docId).update(data);
  }

  /**
   * DELETE ORDER
   * @param docId
   */
  deleteOrderDelHistorial(docId: string): Promise<void> {
    return this.historialCollection.doc<Order>(docId).delete();
  }
}
