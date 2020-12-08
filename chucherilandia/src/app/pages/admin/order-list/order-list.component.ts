import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: any;
  loading = false;


  constructor(
    private orderService: OrderService,
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
      console.log("ORDENES" , this.orders)
    });
  }




}
