import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  productId = '';
  product: Product = null;
  selectedProduct: Product = null;
  productForm: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
    console.log("Ejecutando el componente: AddCarComponent", this.productId)
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');

      if (this.productId) {
        this.loading = true;
        this.productService.getProduct(this.productId).subscribe((item) => {
          this.selectedProduct = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
          this.loading = false;
          console.log(this.selectedProduct)
        });
      }
    });
    
  }

  createForm(): void {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }




}