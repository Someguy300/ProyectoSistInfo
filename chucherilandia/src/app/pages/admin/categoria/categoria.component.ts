import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../models/categoria'


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categorias: Array<Categoria> = [];
  loading = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getAllMetodosenvio();
  }

  getAllMetodosenvio(): void {
    this.loading = true;
    this.categoriaService.getAllCategoria().subscribe((items) => {
      // Setting up tasks
      this.categorias = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Categoria)
      );

      this.loading = false;
    });
  }

  deleteMetodoenvio(id: string): void {
    this.loading = true;
    this.categoriaService.deleteCategoria(id).then((res) => {
      this.loading = false;
    });
  }

}

