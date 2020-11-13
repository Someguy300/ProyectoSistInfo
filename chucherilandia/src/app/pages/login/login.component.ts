import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuth: boolean;

  loginForm: FormGroup = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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
    this.loginForm = this.fb.group({
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
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.authService
      .loginWithCredentials(user)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err) => this.visibilidad('#alerta', true));
  }
}
