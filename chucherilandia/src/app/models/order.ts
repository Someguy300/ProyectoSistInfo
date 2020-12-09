import { Bolsa } from './bolsa';

export interface Order {
    $key?: string;
    user: string;
    total: number;
    metodoPago: string;
    metodoEnvio: string;
    bolsas: Array<Bolsa>
}
