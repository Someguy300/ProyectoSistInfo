import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  visibilidad(selector, visible) {
    var elemento = document.querySelector(selector);
    console.log(elemento);
    if (elemento != null) {
      elemento.style.display = visible?'block':'none';
    } 
    setTimeout(() => { elemento.style.display = 'none'; }, 3000);
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  authWithGoogle(): void {
    this.authService
      .loginWithGoogle()
      .then(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/tasks']);
        }
      })
      .catch((err) => this.visibilidad('#alerta', true));
  }

  onSubmit(): void {
    const user = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    };
    this.authService
      .signUpWithCredentials(user)
      .then(() => {
        this.router.navigate(['/tasks']);
      })
      .catch((err) => this.visibilidad('#alerta', true));
  }
}
