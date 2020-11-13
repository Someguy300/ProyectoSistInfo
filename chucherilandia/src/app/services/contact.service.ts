import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactCollection: AngularFirestoreCollection<Contact>;

  constructor(private db: AngularFirestore) {
    this.contactCollection = this.db.collection<Contact>('contacts');
  }

  /**
   * GET ALL TASKS
   */
  getAllContacts(): Observable<DocumentChangeAction<Contact>[]> {
    return this.contactCollection.snapshotChanges();
  }

  /**
   * GET TASK BY ID
   * @param contactId
   */
  getContact(contactId: string): Observable<Action<DocumentSnapshot<Contact>>> {
    return this.contactCollection.doc<Contact>(contactId).snapshotChanges();
  }

  /**
   * CREATE NEW TASK
   * @param newContact
   */
  createContact(newContact: Contact): Promise<DocumentReference> {
    return this.contactCollection.add(newContact);
    console.log("Ejecutando -> createContact(newContact: Contact): Promise<DocumentReference>")
  }

  /**
   * UPDATE SELECTED TASK
   * @param data
   * @param docId
   */
  updateContact(data: Contact, docId: string): Promise<void> {
    return this.contactCollection.doc<Contact>(docId).update(data);
  }

  /**
   * DELETE TASK
   * @param docId
   */
  deleteContact(docId: string): Promise<void> {
    return this.contactCollection.doc<Contact>(docId).delete();
  }
}
