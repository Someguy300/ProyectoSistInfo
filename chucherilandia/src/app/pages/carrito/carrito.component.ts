import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductService } from 'src/app/services/product.service';
import { auth, User } from 'firebase';
import { Bolsa } from 'src/app/models/bolsa';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  auxBolsas: Array<Bolsa>=[];
  bolsas: Array<Bolsa>=[];

  auxCoste: Array<number>=[];

  cantidades: Array<number>=[];
  precios:Array<number>=[];

  productsIds: Array<string>=[];
  
  products: Array<Product> = [];
  productCar: Array<Product> = [];
  loading = false;

  constructor(private carritoService: CarritoService,private productService: ProductService,) {}

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(): void {
    this.loading = true;
    this.carritoService.getCarrito(auth().currentUser.uid).subscribe((items) => {
      this.auxBolsas = items.payload.data().bolsas.map(
        (item) =>
          ({
            costoTotal:item.costoTotal,
            pesoTotal:item.pesoTotal,
            user:item.user,
            precioComun:item.precioComun,
            contenido: item.contenido,
          } as Bolsa)
      );
      this.auxCoste.push(items.payload.data().coste)
      for (let bolsa of this.auxBolsas) {
        this.bolsas.push(bolsa);
        this.precios.push(bolsa.costoTotal);
        for(let prodref of bolsa.contenido){
          this.productsIds.push(prodref.prodId)
          this.cantidades.push(prodref.cantidad)
        }
      }
      this.getProductsCarrito();
    });
    
  }

  getProductsCarrito(): void {
    this.productService.getAllProducts().subscribe((items) => {
      this.products = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Product)
      );
      
      
      for(let productId of this.productsIds){
        for(let product of this.products){
          if(productId == product.$key){
            this.productCar.push(product)
            console.log('ok')
          }
        }
      }
      
    });
    this.loading=false;
  }

  /*
  deleteCategory(categoryId: string): void {
    this.loading = true;
    this.carritoService.emptyCart().then((res) => {
      this.loading = false;
    });
  }
  */

}
