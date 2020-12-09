import { Component, OnInit } from '@angular/core';
import { Bolsa } from 'src/app/models/bolsa';
import { auth, User } from 'firebase';
import { Product } from 'src/app/models/product';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductService } from 'src/app/services/product.service';
import { BagService } from 'src/app/services/bag.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  auxBolsas: Array<Bolsa>=[];
  bolsas: Array<Bolsa>=[];
  loading = false;

  constructor(
    private bagService: BagService) {}

  ngOnInit(): void {
    this.makeCarrito();
  }


  makeCarrito():void{
    this.bagService.getAllBags().subscribe((items) => {
      // Setting up tasks
      this.auxBolsas = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Bolsa)
      );
      for (let bolsa of this.auxBolsas) {
        console.log(bolsa);
        if(bolsa.user == auth().currentUser.email){
          this.bolsas.push(bolsa)
        }
      }
    },console.error);

    console.log(this.bolsas);
    console.log(auth().currentUser.email);

  }

  deleteBolsa(bolsa:Bolsa):void{
    this.bagService.deleteBag(bolsa.$key).then((res) => {
      window.location.reload();
    });
  }

  


}
