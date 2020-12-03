import { Bolsa } from './bolsa';

export interface Carrito {
    $key: string;
    bolsas: Array<Bolsa>;
    coste: number;
}
