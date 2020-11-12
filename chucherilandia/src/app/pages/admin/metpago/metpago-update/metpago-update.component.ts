import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metodopago } from '../../../../models//metodopago/metodopago.model';
import { MetodopagoService } from '../../../../services/metodopago/metodopago.service';

@Component({
  selector: 'app-metpago-update',
  templateUrl: './metpago-update.component.html',
  styleUrls: ['./metpago-update.component.scss']
})
export class MetpagoUpdateComponent implements OnInit {
  metodopagoId = '';
  metodopago: Metodopago = null;

  constructor(
    private route: ActivatedRoute,
    private metodopagoService: MetodopagoService) { }

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.metodopagoId = params.get('id');
      console.log(this.metodopagoId);
    });
  }

  getMetodopagoById(): void {
    this.metodopagoService.getMetpago(this.metodopagoId).subscribe((item) => {
      this.metodopago = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
  }

}
