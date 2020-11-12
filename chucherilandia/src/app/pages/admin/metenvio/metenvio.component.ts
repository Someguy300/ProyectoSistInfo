import { Component, OnInit } from '@angular/core';
import { MetodoenvioService } from '../../../services/metodoenvio/metodoenvio.service';
import { Metodoenvio } from '../../../models/metodoenvio/metodoenvio'

@Component({
  selector: 'app-metenvio',
  templateUrl: './metenvio.component.html',
  styleUrls: ['./metenvio.component.scss']
})
export class MetenvioComponent implements OnInit {

  metodosdeenvio: Array<Metodoenvio> = [];
  loading = false;

  constructor(private metodoenvioService: MetodoenvioService) { }

  ngOnInit() {
    this.getAllMetodosenvio();
  }

  getAllMetodosenvio(): void {
    this.loading = true;
    this.metodoenvioService.getAllMetenvio().subscribe((items) => {
      // Setting up tasks
      this.metodosdeenvio = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Metodoenvio)
      );

      this.loading = false;
    });
  }

  deleteMetodoenvio(id: string): void {
    this.loading = true;
    this.metodoenvioService.deleteMetEnvio(id).then((res) => {
      this.loading = false;
    });
  }

}
