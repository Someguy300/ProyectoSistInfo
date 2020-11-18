import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoria } from '../../../../models/categoria';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.scss']
})
export class CategoriaUpdateComponent implements OnInit {

  categorias: Array<Categoria> = [];
  loading = false;

  constructor(private CategoriaService: CategoriaService) { }

  ngOnInit() {
    this.getAllCategoria();
  }

  getAllCategoria(): void {
    this.loading = true;
    this.CategoriaService.getAllCategoria().subscribe((items) => {
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

  deleteCategoria(id: string): void {
    this.loading = true;
    this.CategoriaService.deleteCategoria(id).then((res) => {
      this.loading = false;
    });
  }

}
