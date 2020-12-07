import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CarritoService } from 'src/app/services/carrito.service';
import { auth, User } from 'firebase';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  categorys: Array<Category> = [];
  loading = false;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
  }

  getCarrito(): void {
    this.loading = true;
    this.carritoService.getCarrito(auth().currentUser.uid).subscribe((items) => {
      // Setting up categorys
      this.categorys = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Category)
      );

      this.loading = false;
    });
  }

  deleteCategory(categoryId: string): void {
    this.loading = true;
    this.categoryService.deleteCategory(categoryId).then((res) => {
      this.loading = false;
    });
  }


}
