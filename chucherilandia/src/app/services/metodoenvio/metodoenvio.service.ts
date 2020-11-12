import { Injectable } from '@angular/core';
import { Metodoenvio } from '../../models/metodoenvio/metodoenvio'
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
export class MetodoenvioService {

  private taskCollection: AngularFirestoreCollection<Metodoenvio>;

    constructor(private db: AngularFirestore) {
      this.taskCollection = this.db.collection<Metodoenvio>('metenvio');
    }

    /**
     * GET ALL 
     */
    getAllMetenvio(): Observable<DocumentChangeAction<Metodoenvio>[]> {
      return this.taskCollection.snapshotChanges();
    }

    /**
     * GET BY ID
     * @param taskId
     */
    getMetenvio(id: string): Observable<Action<DocumentSnapshot<Metodoenvio>>> {
      return this.taskCollection.doc<Metodoenvio>(id).snapshotChanges();
    }

    /**
     * CREATE
     * @param newmetenvio
     */
    createMetenvio(newmetenvio: Metodoenvio): Promise<DocumentReference> {
      return this.taskCollection.add(newmetenvio);
    }

    /**
     * UPDATE 
     * @param data
     * @param docId
     */
    updateMetEnvio(data: Metodoenvio, docId: string): Promise<void> {
      return this.taskCollection.doc<Metodoenvio>(docId).update(data);
    }

    /**
     * DELETE 
     * @param docId
     */
    deleteMetEnvio(docId: string): Promise<void> {
      return this.taskCollection.doc<Metodoenvio>(docId).delete();
    }
}
