import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss']
})
export class LoadProductComponent implements OnInit {
  productForm: FormGroup;
  image: any;
  categorys: Array<Category> = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCategorys();
  }

  getAllCategorys(): void {
    this.categoryService.getAllCategorys().subscribe((items) => {
      // Setting up categorys
      this.categorys = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Category)
      );
    });
  }

  onSubmit(data: Product) {
    console.log('New product', data);
    this.productService.uploadImage(data, this.image);
    this.router.navigate(['admin/product-list']);
  }

  createForm(): void {
    this.productForm = this.fb.group({
      nombre: [''],
      precio: [''],
      categoria: [''],
      descripcion: [''],
      imagen: [''],
    });
  }


  handleImage ( event: any ) : void { 
    this.image = event.target.files[0]
    console.log(this.image)
  }


}
