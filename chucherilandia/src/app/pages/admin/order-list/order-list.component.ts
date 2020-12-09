import { Component, OnInit } from '@angular/core';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { Bolsa } from 'src/app/models/bolsa';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  loading = false;
  orders: any;
  ordersObject: Order;
  product: Product;



  constructor(
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe((items) => {
      this.orders = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Order)
      );
      this.loading = false;
      this.ordersObject = this.orders
      console.log("ORDENES", this.orders)
    });
  }


  generarBolsa(answers: []) {
    return Object.keys(answers).map(key => answers[key])
  }


  getName(key: string) {
    console.log(key)
    this.loading = true
    this.productService.getProduct(key).subscribe((item) => {
      this.product = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
    this.loading =false
    return(this.product.nombre)
  }




}
