import { ProdRef } from './prod-ref';

export interface Bolsa {
    maxP: 1000;
    minP: 50;
    currentP: 0;
    setPrecio: number;
    coste: number;
    contenido: Array<ProdRef>
}
