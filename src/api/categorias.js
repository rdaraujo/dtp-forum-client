import { SERVER_URL } from "./config";

export const getCategorias = () => {
    return fetch( `${SERVER_URL}/categorias` ).then( (res) => res.json() );
}