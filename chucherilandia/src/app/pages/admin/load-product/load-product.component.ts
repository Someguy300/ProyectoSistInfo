import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss']
})
export class LoadProductComponent implements OnInit {
  productForm: FormGroup;
  image: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(data: Product) {
    console.log('New post', data);
    this.productService.uploadImage(data, this.image);
    this.router.navigate(['/admin/list-product']);
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
