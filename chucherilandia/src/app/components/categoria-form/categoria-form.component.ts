import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../models/categoria'
import { CategoriaService } from '../../services/categoria/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit {


  editCategoria: Categoria = null;
  CategoriaForm: FormGroup;
  CategoriaId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.CategoriaId = params.get('id');

      if (this.CategoriaId) {
        this.loading = true;
        this.categoriaService.getCategoria(this.CategoriaId).subscribe((item) => {
          this.editCategoria = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.CategoriaForm.patchValue({
            nombre: this.editCategoria.nombre,
          });
          this.loading = false;
        });
      }
    });
  }

  createForm(): void {
    this.CategoriaForm = this.fb.group({
      nombre : [''],
    });
  }

  createMetodopago(data: Categoria): void {
    this.loading = true;
    this.categoriaService.createCategoria(data).then((res) => {
      this.loading = false;
      this.router.navigate(['Categorias']);
    });
  }

  updateMetodopago(data: Categoria): void {
    this.loading = true;
    this.categoriaService.updateCategoria(data, this.CategoriaId).then((res) => {
      this.loading = false;
      this.router.navigate(['Categorias']);
    });
  }

  onSubmit(): void {
    const dataCategoria: Categoria = {
      nombre: this.CategoriaForm.get('nombre').value
    };

    if (this.editCategoria) {
      this.updateMetodopago(dataCategoria);
      return;
    }

    this.createMetodopago(dataCategoria);
  }

}

