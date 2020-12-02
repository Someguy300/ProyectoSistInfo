import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products: Array<Product> = [];
  loading = false;
  categorys: Array<Category> = [];

  constructor( private productService: ProductService, private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.getAllProductsList()
    this.getAllCategorys()
  }

  getAllProductsList(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe((items) => {
      this.products = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Product)
      );
      console.log(this.products)
      this.loading = false;
    });
  }

  deleteProducto(id: string): void {
    this.loading = true;
    this.productService.deleteProduct(id).then((res) => {
      this.loading = false;
    });
  }

  buscar() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

buscarCategoria() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("buscadorCategoria");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}


getAllCategorys(): void {
  this.loading = true;
  this.categoryService.getAllCategorys().subscribe((items) => {
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

}
