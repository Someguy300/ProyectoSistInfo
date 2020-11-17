import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodopago } from '../../models/metodopago/metodopago.model'
import { MetodopagoService } from '../../services/metodopago/metodopago.service';

@Component({
  selector: 'app-metpago-form',
  templateUrl: './metpago-form.component.html',
  styleUrls: ['./metpago-form.component.scss']
})
export class MetpagoFormComponent implements OnInit {

  editMetodopago: Metodopago = null;
  metodopagoForm: FormGroup;
  metodopagoId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private metodopagoService: MetodopagoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.metodopagoId = params.get('id');

      if (this.metodopagoId) {
        this.loading = true;
        this.metodopagoService.getMetpago(this.metodopagoId).subscribe((item) => {
          this.editMetodopago = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.metodopagoForm.patchValue({
            nombre: this.editMetodopago.nombre,
            icono: this.editMetodopago.icono,
          });
          this.loading = false;
        });
      }
    });
  }

  createForm(): void {
    this.metodopagoForm = this.fb.group({
      nombre : [''],
      icono : [''],
    });
  }

  createMetodopago(data: Metodopago): void {
    this.loading = true;
    this.metodopagoService.createMetpago(data).then((res) => {
      this.loading = false;
      this.router.navigate(['metodospago']);
    });
  }

  updateMetodopago(data: Metodopago): void {
    this.loading = true;
    this.metodopagoService.updateMetPago(data, this.metodopagoId).then((res) => {
      this.loading = false;
      this.router.navigate(['metodospago']);
    });
  }

  onSubmit(): void {
    const dataMetpago: Metodopago = {
      nombre: this.metodopagoForm.get('nombre').value,
      icono: this.metodopagoForm.get('icono').value
    };

    if (this.editMetodopago) {
      this.updateMetodopago(dataMetpago);
      return;
    }

    this.createMetodopago(dataMetpago);
  }

  cambioIcono(value: string){
    document.getElementById("fab fa-paypal").style.display = "none";
    document.getElementById("fas fa-money-check-alt").style.display = "none";
    document.getElementById("fas fa-money-bill-wave").style.display = "none";
    document.getElementById("far fa-money-bill-alt").style.display = "none";
    document.getElementById("far fa-credit-card").style.display = "none";
    document.getElementById(value).style.display = "block";
  }
  
}
