import { Bolsa } from './bolsa';

export interface Order {
    $key?: string;
    user: string;
    metodoPago: string;
    metodoEnvio: string;
    bolsas: Array<Bolsa>
}
