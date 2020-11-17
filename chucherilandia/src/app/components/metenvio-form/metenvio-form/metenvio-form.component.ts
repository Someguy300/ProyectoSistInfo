import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodoenvio } from '../../../models/metodoenvio/metodoenvio'
import { MetodoenvioService } from '../../../services/metodoenvio/metodoenvio.service';

@Component({
  selector: 'app-metenvio-form',
  templateUrl: './metenvio-form.component.html',
  styleUrls: ['./metenvio-form.component.scss']
})
export class MetenvioFormComponent implements OnInit {

  editMetodoenvio: Metodoenvio = null;
  metodoenvioForm: FormGroup;
  metodoenvioId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private metodoenvioService: MetodoenvioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.metodoenvioId = params.get('id');

      if (this.metodoenvioId) {
        this.loading = true;
        this.metodoenvioService.getMetenvio(this.metodoenvioId).subscribe((item) => {
          this.editMetodoenvio = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.metodoenvioForm.patchValue({
            nombre: this.editMetodoenvio.nombre,
            icono: this.editMetodoenvio.icono,
          });
          this.loading = false;
        });
      }
    });
  }

  createForm(): void {
    this.metodoenvioForm = this.fb.group({
      nombre : [''],
      icono : [''],
    });
  }

  createMetodopago(data: Metodoenvio): void {
    this.loading = true;
    this.metodoenvioService.createMetenvio(data).then((res) => {
      this.loading = false;
      this.router.navigate(['metodosenvio']);
    });
  }

  updateMetodopago(data: Metodoenvio): void {
    this.loading = true;
    this.metodoenvioService.updateMetEnvio(data, this.metodoenvioId).then((res) => {
      this.loading = false;
      this.router.navigate(['metodosenvio']);
    });
  }

  onSubmit(): void {
    const dataMetpago: Metodoenvio = {
      nombre: this.metodoenvioForm.get('nombre').value,
      icono: this.metodoenvioForm.get('icono').value,
    };

    if (this.editMetodoenvio) {
      this.updateMetodopago(dataMetpago);
      return;
    }

    this.createMetodopago(dataMetpago);
  }

  cambioIcono(value: string){
    document.getElementById("fas fa-truck").style.display = "none";
    document.getElementById("fas fa-motorcycle").style.display = "none";
    document.getElementById("fas fa-bicycle").style.display = "none";
    document.getElementById("fas fa-store").style.display = "none";
    document.getElementById("fas fa-road").style.display = "none";
    document.getElementById(value).style.display = "block";
  }

}
