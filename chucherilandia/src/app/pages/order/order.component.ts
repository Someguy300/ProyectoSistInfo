import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase';
import { Bolsa } from 'src/app/models/bolsa';
import { Metodoenvio } from 'src/app/models/metodoenvio/metodoenvio';
import { Metodopago } from 'src/app/models/metodopago/metodopago.model';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';
import { MetodoenvioService } from 'src/app/services/metodoenvio/metodoenvio.service';
import { MetodopagoService } from 'src/app/services/metodopago/metodopago.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  metodosPago: Array<Metodopago> = [];
  metodosEnvio: Array<Metodoenvio> = [];
  orderForm: FormGroup;
  bolsas: Array<Bolsa> = [];
  user: User = null;
  loading = false;

  constructor(
    private metodoPagoService: MetodopagoService,
    private metodoEnvioService: MetodoenvioService,
    private fb: FormBuilder,
    private bagService: BagService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getMetenvio();
    this.getMetpago();
    this.createForm();
    this.getBolsas();
    this.getCurrentUser();
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
      var usuario = this.user.email
      this.bolsas.forEach(function (bolsa) {
        if (bolsa.user == usuario) {
          bolsaUser.push(bolsa)
        }
      });
      this.bolsas = bolsaUser
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
    console.log("Enviado")
    console.log(this.bolsas)
  }



}
