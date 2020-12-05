import { BoundElementPropertyAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Bolsa } from 'src/app/models/bolsa';
import { Category } from 'src/app/models/category';
import { ProdRef } from 'src/app/models/prod-ref';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-bag',
  templateUrl: './create-bag.component.html',
  styleUrls: ['./create-bag.component.scss']
})


export class CreateBagComponent implements OnInit {
  user: User = null;
  isAuthenticated = false;
  productId = '';
  selectedProduct: Product = null;
  productForm: FormGroup;
  loading = false;
  currentTab = 1;
  bolsa: Bolsa = { user: null, precioComun: 0, costoTotal: 0, pesoTotal: 0, contenido: [], };
  value = 0; // Peso
  indiceBolsa = 0
  porcientoPeso: string
  products: Array<Product> = [];
  categorys: Array<Category> = [];
  productFiltered: Array<Product> = [];
  precioDeLaBolsa = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
    this.showTab();
    this.getCurrentUser();
    this.visibilidad('#openBag', true)
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
        });
      }
    });

  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.user = response;
        this.isAuthenticated = true;

        return;
      }

      this.isAuthenticated = false;
    });
  }

  visibilidad(selector, visible) {
    var elemento = document.querySelector(selector);
    if (elemento != null) {
      elemento.style.display = visible ? 'block' : 'none';
    }
  }

  siguiente() {
    this.currentTab++;
    this.hideTabs()
    this.showTab()
  }

  anterior() {
    this.currentTab--;
    this.hideTabs()
    this.showTab()
  }


  hideTabs() {
    this.visibilidad('#inicial', false)
    this.visibilidad('#primerProducto', false)
    this.visibilidad('#preguntar', false)
  }

  showTab() {
    switch (this.currentTab) {
      case 1:
        this.visibilidad('#inicial', true)
        break;
      case 2:
        this.visibilidad('#primerProducto', true)
        break;
      case 3:
        this.visibilidad('#preguntar', true)
        this.Embolsar()
        this.calcularPorciento()
        break;
      case 4:
        this.visibilidad('#finalizar', true)
        break;
      case 5:
        this.visibilidad('#lista', true)
        this.getAllProductsList()
        break;
      default:
      // code block
    }
  }

  agregarOtro() {
    this.currentTab = 5
    this.hideTabs()
    this.showTab()
  }

  menos() {
    this.value = this.value - 50;
    this.control()
    this.calcularPorciento()
  }

  mas() {
    this.value = this.value + 50;
    this.control()
    this.calcularPorciento()
  }

  control() {
    if (this.value > 2000) {
      this.value = 2000
    } else if (this.value < 0) {
      this.value = 0
    }
    this.calcularPorciento()
  }


  Embolsar() {
    if (this.indiceBolsa == 0) {//Primera Bolsa
      var ProdRef: ProdRef = {
        prodId: this.selectedProduct.$key,
        cantidad: Number(this.value),
        precio: Number(this.selectedProduct.precio),
      };
      this.bolsa.user = this.user.email
      this.bolsa.precioComun = Number(this.selectedProduct.precio)
      this.bolsa.costoTotal = Number(this.value * this.selectedProduct.precio)
      this.bolsa.pesoTotal = Number(this.value)
      this.bolsa.contenido.push(ProdRef)
      this.precioDeLaBolsa = this.selectedProduct.precio
    } else {

    }

    console.log("BOLSA", this.bolsa)
  }

  calcularPorciento() {
    var porciento = (this.value * 100) / 2000
    this.porcientoPeso = porciento + '%'
    document.getElementById('porciento').setAttribute("style", "background: linear-gradient(to top, #ffc107 " + this.porcientoPeso + ", #ffffff " + this.porcientoPeso);
    document.getElementById('porcientoBolsa').setAttribute("style", "background: linear-gradient(to top, #ffc107 " + this.porcientoPeso + ", #ffffff " + this.porcientoPeso);
  }


  getAllProductsList(): void {
    console.log("PRECIO DE LA BOLSA" , this.precioDeLaBolsa)
    this.loading = true;


    console.log(this.products)
    this.productFiltered=  []
    console.log(this.productFiltered)
    this.productService.getAllProducts().subscribe((items) => {

      var prod :any
      prod = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Product)
      );
this.products=prod
console.log("EJECUTANDO FILTRADO")
this.filtrado(this.products)
    }
   
    
    );
 
  }


  filtrado(products)
  {
        
    for (let producto of products){       
      if(producto.precio == this.precioDeLaBolsa ){

        if(!this.productFiltered.find(e => e.nombre === producto.nombre))
        {

          this.productFiltered.push(producto)
        }
     
      }
    }
  }

}