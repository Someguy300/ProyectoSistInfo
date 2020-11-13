import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      mensaje: [''],
    });
  }

  createContact(data: Contact): void {
    this.loading = true;
    this.contactService.createContact(data).then((res) => {
      this.loading = false;
      this.router.navigate(['']);
    });
    console.log("Ejecuando -> createContact(data: Contact): void")
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/sounds/mensaje_enviado.mp3";
    audio.load();
    audio.play();
  }


  onSubmit(): void {
    const dataContact: Contact = {
      nombre: this.contactForm.get('nombre').value,
      apellido: this.contactForm.get('apellido').value,
      email: this.contactForm.get('email').value,
      mensaje: this.contactForm.get('mensaje').value,
    };
    this.createContact(dataContact);
    this.playAudio();
    console.log("Ejecutando -> onSubmit(): void")
  }

}
