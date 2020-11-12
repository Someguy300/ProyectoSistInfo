import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metodoenvio } from '../../../../../models/metodoenvio/metodoenvio';
import { MetodoenvioService } from '../../../../../services/metodoenvio/metodoenvio.service';

@Component({
  selector: 'app-metenvio-update',
  templateUrl: './metenvio-update.component.html',
  styleUrls: ['./metenvio-update.component.scss']
})
export class MetenvioUpdateComponent implements OnInit {

  metodoenvioId = '';
  metodoenvio: Metodoenvio = null;

  constructor(
    private route: ActivatedRoute,
    private metodoenvioService: MetodoenvioService) { }

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.metodoenvioId = params.get('id');
      console.log(this.metodoenvioId);
    });
  }

  getMetodopagoById(): void {
    this.metodoenvioService.getMetenvio(this.metodoenvioId).subscribe((item) => {
      this.metodoenvio = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
  }

}
