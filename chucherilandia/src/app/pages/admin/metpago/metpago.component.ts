import { Component, OnInit } from '@angular/core';
import { MetodopagoService } from '../../../services/metodopago.service';
import { Metodopago } from '../../../models/metodopago.model';

@Component({
  selector: 'app-metpago',
  templateUrl: './metpago.component.html',
  styleUrls: ['./metpago.component.scss']
})
export class MetpagoComponent implements OnInit {

  metodosdepago: Array<Metodopago> = [];
  loading = false;

  constructor(private metodopagoService: MetodopagoService) { }

  ngOnInit() {
    this.getAllMetodospago();
  }

  getAllMetodospago(): void {
    this.loading = true;
    this.metodopagoService.getAllMetpago().subscribe((items) => {
      // Setting up tasks
      this.metodosdepago = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Metodopago)
      );

      this.loading = false;
    });
  }

  deleteMetodopago(id: string): void {
    this.loading = true;
    this.metodopagoService.deleteMetPago(id).then((res) => {
      this.loading = false;
    });
  }

  

}
