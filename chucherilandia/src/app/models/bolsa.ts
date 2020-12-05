import { ProdRef } from './prod-ref';

export interface Bolsa {
    user: string;
    precioComun: number;
    costoTotal: number;
    pesoTotal: number;
    contenido: Array<ProdRef>
}
