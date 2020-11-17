export interface Product {
    $key?: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    imageProduct?: any;
    fileRef?: string;
}
