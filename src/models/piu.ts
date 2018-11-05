import { User } from "./user";

export interface Piu{
    id: number,
    favoritado: boolean,
    conteudo: string,
    data: string,
    usuario,
    creator: User
}