import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria'
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
export class CategoriaService {

  private taskCollection: AngularFirestoreCollection<Categoria>;

  constructor(private db: AngularFirestore) {
    this.taskCollection = this.db.collection<Categoria>('Categorias');
  }

  /**
   * GET ALL 
   */
  getAllCategoria(): Observable<DocumentChangeAction<Categoria>[]> {
    return this.taskCollection.snapshotChanges();
  }

  /**
   * GET BY ID
   * @param CategoriaId
   */
  getCategoria(id: string): Observable<Action<DocumentSnapshot<Categoria>>> {
    return this.taskCollection.doc<Categoria>(id).snapshotChanges();
  }

  /**
   * CREATE
   * @param newcategoria
   */
  createCategoria(newmetenvio: Categoria): Promise<DocumentReference> {
    return this.taskCollection.add(newmetenvio);
  }

  /**
   * UPDATE 
   * @param data
   * @param oldcategoria
   */
  updateCategoria(data: Categoria, docId: string): Promise<void> {
    return this.taskCollection.doc<Categoria>(docId).update(data);
  }

  /**
   * DELETE 
   * @param selectcategoria
   */
  deleteCategoria(docId: string): Promise<void> {
    return this.taskCollection.doc<Categoria>(docId).delete();
  }
}

