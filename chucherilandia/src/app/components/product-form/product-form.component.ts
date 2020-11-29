import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  image: any;
  categorys: Array<Category> = [];
  editProduct: Product = null;
  productId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCategorys();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');

      if (this.productId) {
        this.loading = true;
        this.productService.getProduct(this.productId).subscribe((item) => {
          this.editProduct = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.productForm.patchValue({
            nombre: this.editProduct.nombre,
            precio: this.editProduct.precio,
            categoria: this.editProduct.categoria,
            descripcion: this.editProduct.descripcion,
            imageProduct: this.editProduct.imageProduct,
          });
          this.loading = false;
        });
      }
    });
  }

  getAllCategorys(): void {
    this.categoryService.getAllCategorys().subscribe((items) => {
      this.categorys = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Category)
      );
    });
  }


  updateProductWithoutImage(data: Product): void {
    this.productService.updateProduct(data, this.productId).then((res) => {    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).then((res) => {    });
  }

  onSubmit(data: Product) {
    if (this.editProduct) {
      if (this.image){
        console.log("Editar con imagen",data)
        this.deleteProduct(this.productId);
        this.productService.uploadImage(data, this.image);
      }else{
        this.updateProductWithoutImage(data);
      }
    }else{
      this.productService.uploadImage(data, this.image);
    }
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
