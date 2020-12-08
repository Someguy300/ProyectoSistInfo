import { ProdRef } from './prod-ref';

export interface Bolsa {
    $key?: string;
    user: string;
    precioComun: number;
    costoTotal: number;
    pesoTotal: number;
    contenido: Array<ProdRef>
}
