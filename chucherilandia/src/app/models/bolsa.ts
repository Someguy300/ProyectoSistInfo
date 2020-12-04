import { ProdRef } from './prod-ref';

export interface Bolsa {
    precioComun: number;
    costoTotal: number;
    pesoTotal: number;
    contenido: Array<ProdRef>
}
