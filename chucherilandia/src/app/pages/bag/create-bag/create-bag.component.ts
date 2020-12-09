import { BoundElementPropertyAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { auth,User } from 'firebase';
import { Bolsa } from 'src/app/models/bolsa';
import { Category } from 'src/app/models/category';
import { ProdRef } from 'src/app/models/prod-ref';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CarritoService } from 'src/app/services/carrito.service';


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
    private bagService: BagService,
    private carritoService: CarritoService,
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
    if(this.currentTab == 1 || this.currentTab == 2 || this.currentTab == 3 ){
      this.currentTab++;
      this.hideTabs()
      this.showTab()
    }else if(this.currentTab == 4){
      this.router.navigate(['store']);
    }else if(this.currentTab == 5){
      this.currentTab = 4
      this.hideTabs()
      this.showTab()
    }
  }

  volverEmpezar() {
    this.value = 0
    this.currentTab = 1;
    this.bolsa = { user: null, precioComun: 0, costoTotal: 0, pesoTotal: 0, contenido: [], };
    this.calcularPorciento()
    this.hideTabs()
    this.showTab()
  }


  hideTabs() {
    this.visibilidad('#inicial', false)
    this.visibilidad('#gramosProducto', false)
    this.visibilidad('#preguntar', false)
    this.visibilidad('#finalizar', false)
    this.visibilidad('#lista', false)
  }

  showTab() {
    switch (this.currentTab) {
      case 1:
        this.visibilidad('#inicial', true)
        break;
      case 2:
        this.visibilidad('#gramosProducto', true)
        setTimeout(() => { this.calcularPorciento(); }, 250);
        break;
      case 3:
        this.visibilidad('#preguntar', true)
        this.Embolsar()
        break;
      case 4:
        this.visibilidad('#finalizar', true)
        this.saveBag()
        break;
      case 5:
        this.visibilidad('#lista', true)
        this.getAllProductsList()
        break;
      default:
      // code block
    }
  }

  otroProducto(product: Product) {
    this.currentTab = 2
    this.hideTabs()
    this.showTab()
    this.selectedProduct = product
    this.loading = false
    this.value = 0
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
    if (this.indiceBolsa == 0) {
      if (this.value > 2000) {
        this.value = 2000
      } else if (this.value < 0) {
        this.value = 0
      }
    } else {
      if (this.value + this.bolsa.pesoTotal > 2000) {
        this.value = 2000 - this.bolsa.pesoTotal
      } else if (this.value < 0) {
        this.value = 0
      }
    }

    this.calcularPorciento()
  }


  Embolsar() {
    var ProdRef: ProdRef = {
      prodId: this.selectedProduct.$key,
      nombre: this.selectedProduct.nombre,
      cantidad: Number(this.value),
    };
    if (this.indiceBolsa == 0) {// Primer producto de la bolsa
      this.bolsa.user = this.user.email
      this.bolsa.precioComun = Number(this.selectedProduct.precio)
      this.bolsa.costoTotal = Number(this.value * this.selectedProduct.precio)
      this.bolsa.pesoTotal = Number(this.value)
      this.bolsa.contenido.push(ProdRef)
      this.precioDeLaBolsa = this.selectedProduct.precio
      this.calcularPorciento()
      this.indiceBolsa++
    } else { // El resto de los productos
      this.bolsa.costoTotal = Number(this.value * this.selectedProduct.precio)
      this.bolsa.pesoTotal = Number(this.bolsa.pesoTotal + this.value)
      this.bolsa.contenido.push(ProdRef)
      this.calcularPorciento()
      this.indiceBolsa++
    }
    this.productFiltered.push(this.selectedProduct) // Evitar que se muestre el producto ya agregado en la proxima lista
    console.log("BOLSA: ", this.bolsa)
  }



  calcularPorciento() {
    if (this.currentTab == 2) {
      if (this.indiceBolsa == 0) {
        var porciento = (this.value * 100) / 2000
        this.porcientoPeso = porciento + '%'
      } else {
        var porciento = ((this.value + this.bolsa.pesoTotal) * 100) / 2000
        this.porcientoPeso = porciento + '%'
      }
      document.getElementById('porciento').setAttribute("style", "background: linear-gradient(to top, #ffc107 " + this.porcientoPeso + ", #ffffff " + this.porcientoPeso);
    } else {
      var porciento = (this.bolsa.pesoTotal * 100) / 2000
      this.porcientoPeso = porciento + '%'
      document.getElementById('porcientoBolsa').setAttribute("style", "background: linear-gradient(to top, #ffc107 " + this.porcientoPeso + ", #ffffff " + this.porcientoPeso);
    }
  }


  getAllProductsList(): void {
    this.loading = true;
    this.productFiltered = []
    this.productService.getAllProducts().subscribe((items) => {

      var prod: any
      prod = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Product)
      );
      this.products = prod
      this.filtrado(this.products)
    }
    );
  }


  filtrado(products) {
    for (let producto of products) {
      if (producto.precio == this.precioDeLaBolsa) {
        if (!this.productFiltered.find(e => e.nombre === producto.nombre)) {
          if (!this.bolsa.contenido.find(aux => aux.prodId === producto.$key)) { // cambiar la negacion para que no pueda agregar el mismo producto ya existentes en la bolsa
            this.productFiltered.push(producto)
          }
        }
      }
    }
  }

  saveBag() {
    console.log("GUARDANDO BOLSA EN FIREBASE", this.bolsa)
    console.log('uid in create-bag', auth().currentUser.uid)
    this.carritoService.addToCarrito(auth().currentUser.uid, this.bolsa)
    this.bagService.createBag(this.bolsa)
  }

}