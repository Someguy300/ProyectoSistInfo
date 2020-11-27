import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction, DocumentSnapshot, DocumentReference, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoryCollection = this.db.collection<Category>('categorias');
  }

  /**
   * GET ALL CATEGORIES
   */
  getAllCategorys(): Observable<DocumentChangeAction<Category>[]> {
    return this.categoryCollection.snapshotChanges();
  }

  /**
   * GET CATEGORY BY ID
   * @param categoryId
   */
  getCategory(categoryId: string): Observable<Action<DocumentSnapshot<Category>>> {
    return this.categoryCollection.doc<Category>(categoryId).snapshotChanges();
  }

  /**
   * CREATE NEW CATEGORY
   * @param newCategory
   */
  createCategory(newCategory: Category): Promise<DocumentReference> {
    return this.categoryCollection.add(newCategory);
  }

  /**
   * UPDATE SELECTED CATEGORY
   * @param data
   * @param docId
   */
  updateCategory(data: Category, docId: string): Promise<void> {
    return this.categoryCollection.doc<Category>(docId).update(data);
  }

  /**
   * DELETE CATEGORY
   * @param docId
   */
  deleteCategory(docId: string): Promise<void> {
    return this.categoryCollection.doc<Category>(docId).delete();
  }
}
