import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bolsa } from 'src/app/models/bolsa';
import { ProdRef } from 'src/app/models/prod-ref';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-bag',
  templateUrl: './create-bag.component.html',
  styleUrls: ['./create-bag.component.scss']
})
export class CreateBagComponent implements OnInit {
  productId = '';
  selectedProduct: Product = null;
  productForm: FormGroup;
  loading = false;
  currentTab = 1;
  bolsa: Bolsa = null; 
  value = 0;
indiceBolsa = 0
porcientoPeso: string

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
this.showTab();
    this.visibilidad('#openBag', true)
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

  visibilidad(selector, visible) {
    var elemento = document.querySelector(selector);
    console.log(elemento);
    if (elemento != null) {
      elemento.style.display = visible?'block':'none';
    } 
  }

  siguiente(){
    this.currentTab++;
    this.hideTabs()
    this.showTab()
  }

  anterior(){
    this.currentTab--;
    this.hideTabs()
    this.showTab()
  }


hideTabs(){
  this.visibilidad('#inicial',false)
  this.visibilidad('#primerProducto',false)
}

showTab(){
  switch(this.currentTab) {
    case 1:
      this.visibilidad('#inicial',true)
      break;
    case 2:
      this.visibilidad('#primerProducto',true)
      break;
    case 3:
      this.visibilidad('#primerProducto',true)
      this.Embolsar()
      break;
    default:
      // code block
  }
}

menos() {
  this.value = this.value - 100;  
  this.control()
  this.calcularPorciento()
}

mas() {
  this.value = this.value + 100; 
  this.control()
  this.calcularPorciento()
}

control(){
    if(this.value > 2000){
      this.value = 2000
    }else if(this.value < 0){
    this.value = 1
  }
  this.calcularPorciento()
}


Embolsar() {
  console.log("Voy a empezar la bolsa",this.value)
  var ProdRef: ProdRef = { 
    prodId: this.selectedProduct.$key,
    cantidad: this.value,
    precio: this.selectedProduct.precio,
  }; 


  var bolsaActual: Bolsa = {
    precioComun: this.selectedProduct.precio,
    costoTotal: this.value * this.selectedProduct.precio,
    pesoTotal: this.bolsa.pesoTotal + this.value,
    contenido: null,
};

  console.log("BOLSA" , this.bolsa)
}

calcularPorciento(){
var porciento = (this.value * 100)/2000
this.porcientoPeso = porciento + '%'
console.log("PorcientoPeso: " ,this.porcientoPeso )
document.getElementById('porciento').setAttribute("style", "background: linear-gradient(to top, #ffc107 " + this.porcientoPeso + ", #ffffff " + this.porcientoPeso);
}



}