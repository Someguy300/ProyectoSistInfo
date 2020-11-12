import { Injectable } from '@angular/core';
import { Metodopago } from '../models/metodopago.model'
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {

    private taskCollection: AngularFirestoreCollection<Metodopago>;

    constructor(private db: AngularFirestore) {
      this.taskCollection = this.db.collection<Metodopago>('metpago');
    }

    /**
     * GET ALL TASKS
     */
    getAllMetpago(): Observable<DocumentChangeAction<Metodopago>[]> {
      return this.taskCollection.snapshotChanges();
    }

    /**
     * GET TASK BY ID
     * @param taskId
     */
    getMetpago(id: string): Observable<Action<DocumentSnapshot<Metodopago>>> {
      return this.taskCollection.doc<Metodopago>(id).snapshotChanges();
    }

    /**
     * CREATE NEW TASK
     * @param newmetpago
     */
    createMetpago(newmetpago: Metodopago): Promise<DocumentReference> {
      return this.taskCollection.add(newmetpago);
    }

    /**
     * UPDATE SELECTED TASK
     * @param data
     * @param docId
     */
    updateMetPago(data: Metodopago, docId: string): Promise<void> {
      return this.taskCollection.doc<Metodopago>(docId).update(data);
    }

    /**
     * DELETE TASK
     * @param docId
     */
    deleteMetPago(docId: string): Promise<void> {
      return this.taskCollection.doc<Metodopago>(docId).delete();
    }
}

  


