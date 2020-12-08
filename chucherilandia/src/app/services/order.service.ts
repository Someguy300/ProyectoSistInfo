import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, DocumentReference, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderCollection: AngularFirestoreCollection<Order>;

  constructor(private db: AngularFirestore) {
    this.orderCollection = this.db.collection<Order>('orders');
  }

  /**
   * GET ALL ORDERS
   */
  getAllOrders(): Observable<DocumentChangeAction<Order>[]> {
    return this.orderCollection.snapshotChanges();
  }

  /**
   * GET ORDER BY ID
   * @param orderId
   */
  getOrder(orderId: string): Observable<Action<DocumentSnapshot<Order>>> {
    return this.orderCollection.doc<Order>(orderId).snapshotChanges();
  }

  /**
   * CREATE NEW ORDER
   * @param newOrder
   */
  createOrder(newOrder: Order): Promise<DocumentReference> {
    return this.orderCollection.add(newOrder);
  }

  /**
   * UPDATE SELECTED ORDER
   * @param data
   * @param docId
   */
  updateOrder(data: Order, docId: string): Promise<void> {
    return this.orderCollection.doc<Order>(docId).update(data);
  }

  /**
   * DELETE ORDER
   * @param docId
   */
  deleteOrder(docId: string): Promise<void> {
    return this.orderCollection.doc<Order>(docId).delete();
  }
}
