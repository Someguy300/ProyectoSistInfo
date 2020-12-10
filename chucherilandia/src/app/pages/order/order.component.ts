import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { Bolsa } from 'src/app/models/bolsa';
import { Metodoenvio } from 'src/app/models/metodoenvio/metodoenvio';
import { Metodopago } from 'src/app/models/metodopago/metodopago.model';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { MetodoenvioService } from 'src/app/services/metodoenvio/metodoenvio.service';
import { MetodopagoService } from 'src/app/services/metodopago/metodopago.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild('paypalElement', { static: true })
  private paypalElement: ElementRef;
  metodosPago: Array<Metodopago> = [];
  metodosEnvio: Array<Metodoenvio> = [];
  orderForm: FormGroup;
  bolsas: Array<Bolsa> = [];
  user: User = null;
  loading = false;
  order: Order = {
    user: '',
    total: 0,
    metodoPago: '',
    metodoEnvio: '',
    bolsas: [],
  };
  MetodoPagoSelected = '';
  MetodoEnvioSelected = '';

  constructor(
    private metodoPagoService: MetodopagoService,
    private metodoEnvioService: MetodoenvioService,
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private bagService: BagService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMetenvio();
    this.getMetpago();
    this.createForm();
    this.getBolsas();
    this.getCurrentUser();
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount:{
                  value: "1000",
                  currency_code: 'USD'
                }
              }
            ]
          });
        }

      })
      .render(this.paypalElement.nativeElement);
  }

  

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.user = response;
        return;
      }
    });
  }

  getMetpago(): void {
    this.metodoPagoService.getAllMetpago().subscribe((items) => {
      this.metodosPago = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Metodopago)
      );
    });
  }

  getMetenvio(): void {
    this.metodoEnvioService.getAllMetenvio().subscribe((items) => {
      this.metodosEnvio = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Metodoenvio)
      );
    });
  }

  getBolsas(): void {
    this.loading = true;
    this.bagService.getAllBags().subscribe((items) => {
      this.bolsas = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Bolsa)
      );
    });
    setTimeout(() => {
      let bolsaUser = [];
      var usuario = this.user.email;
      this.bolsas.forEach(function (bolsa) {
        if (bolsa.user == usuario) {
          bolsaUser.push(bolsa);
        }
      });
      this.bolsas = bolsaUser;
      this.loading = false;
    }, 1000);
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      metodoPago: [''],
      metodoEnvio: [''],
    });
  }

  onSubmit() {
    console.log('Enviado', this.user.email);
    if (this.MetodoPagoSelected != "" && this.MetodoEnvioSelected !="" ) {
      var total = 0;
    for (let bolsa of this.bolsas) {
      total = total + bolsa.costoTotal;
    }
    var usuario = this.user.email;
    //Generando la orden
    this.order.user = usuario;
    this.order.total = total;
    this.order.bolsas = this.bolsas;
    this.order.metodoPago = this.MetodoPagoSelected;
    this.order.metodoEnvio = this.MetodoEnvioSelected;
    console.log('ORDEN: ', this.order);
    this.orderService.createOrder(this.order).then((res) => {});
    this.visibilidad('#orden', false);
    this.visibilidad('#listo', true);
    //Borrar las bolsa luego que las agrego a la orden
    var i = 0;
    for (i = 0; i < this.bolsas.length; i++) {
      console.log(this.bolsas[i].$key);
      this.bagService.deleteBag(this.bolsas[i].$key).then((res) => {});
    }
    this.carritoService.emptyCart(auth().currentUser.uid);

    } else {
      this.visibilidad('#alerta' , true)
    }
    
  }

  irHome() {
    this.router.navigate(['']);
  }

  visibilidad(selector, visible) {
    var elemento = document.querySelector(selector);
    if (elemento != null) {
      elemento.style.display = visible ? 'block' : 'none';
    }
  }
}