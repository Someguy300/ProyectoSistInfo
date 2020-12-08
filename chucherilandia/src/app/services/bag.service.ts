import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, DocumentReference, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bolsa } from '../models/bolsa';

@Injectable({
  providedIn: 'root'
})
export class BagService {
  private bagCollection: AngularFirestoreCollection<Bolsa>;

  constructor(private db: AngularFirestore) {
    this.bagCollection = this.db.collection<Bolsa>('bags');
  }

  /**
   * GET ALL BAGS
   */
  getAllBags(): Observable<DocumentChangeAction<Bolsa>[]> {
    return this.bagCollection.snapshotChanges();
  }

  /**
   * GET BAG BY ID
   * @param bagId
   */
  getBag(bagId: string): Observable<Action<DocumentSnapshot<Bolsa>>> {
    return this.bagCollection.doc<Bolsa>(bagId).snapshotChanges();
  }

  /**
   * CREATE NEW BAG
   * @param newBag
   */
  createBag(newBag: Bolsa): Promise<DocumentReference> {
    return this.bagCollection.add(newBag);
  }

  /**
   * UPDATE SELECTED BAG
   * @param data
   * @param docId
   */
  updateBag(data: Bolsa, docId: string): Promise<void> {
    return this.bagCollection.doc<Bolsa>(docId).update(data);
  }

  /**
   * DELETE BAG
   * @param docId
   */
  deleteBag(docId: string): Promise<void> {
    return this.bagCollection.doc<Bolsa>(docId).delete();
  }
}
