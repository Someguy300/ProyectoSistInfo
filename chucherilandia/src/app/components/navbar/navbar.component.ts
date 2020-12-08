import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { auth, User } from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
import { Cuenta } from '../../models/cuenta';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = null;
  isAuthenticated = false;
  isUser = false;
  isAdmin = false;
  tipo:string = null;
  cuenta:Cuenta = {
    $key:null,
    tipo:null,
  };


  constructor(private authService: AuthService, private router: Router,
    private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.getCurrentUser();
    
  }

  checkCarrito():void{
    this.carritoService.getCarrito(auth().currentUser.uid).subscribe((response) => {
      if(!response.payload.exists){
        this.carritoService.createCarrito(auth().currentUser.uid)
      }
    });
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.user = response;
        this.isAuthenticated = true;

        this.authService.getCuentaTipo(auth().currentUser.uid).subscribe((items) => {
          if(items.payload.data()==undefined){
            this.cuenta.$key = auth().currentUser.uid;
            this.cuenta.tipo = 'usuario';
            this.tipo = 'usuario';
            this.authService.createCuenta(this.cuenta);
          }else{
            this.tipo = items.payload.data().tipo;
          }
          if(this.tipo=='usuario')this.isUser=true;
          else if(this.tipo=='admin'){
            this.authService.isAdmin = true;
            this.isAdmin=true;
          }

          if(this.isAuthenticated && this.isUser){
            this.checkCarrito();
          }
        });
        return;
      }

      this.reset();
      this.isAuthenticated = false;
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.reset();
      this.router.navigate(['/']);
    });
  }

  reset():void{
    this.tipo=null;
    this.authService.isAdmin = false;
    this.isUser=false;
    this.isAdmin=false;
  }

  

}

