import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  contacts: Array<Contact> = [];
  loading = false;

  constructor(private contactsService: ContactService) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.loading = true;
    this.contactsService.getAllContacts().subscribe((items) => {
      // Setting up contacts
      this.contacts = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Contact)
      );

      this.loading = false;
    });
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/sounds/mensaje_eliminado.mp3";
    audio.load();
    audio.play();
  }

  deleteContact(contactId: string): void {
    this.loading = true;
    this.contactsService.deleteContact(contactId).then((res) => {
      this.loading = false;
    });
    this.playAudio();
  }

}
