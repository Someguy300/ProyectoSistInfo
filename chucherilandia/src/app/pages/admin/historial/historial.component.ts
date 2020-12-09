import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historial: Array<Order> = [];

  constructor(private historialService: HistorialService) { }

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(): void {
    this.historialService.getHistorialOrders().subscribe((items) => {
      this.historial = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Order)
      );
    });
  }

  deleteOrdenDelHistorial(key: string): void {
    this.historialService.deleteOrderDelHistorial(key).then((res) => { });
  }


}
