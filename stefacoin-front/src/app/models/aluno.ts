import { Usuario } from "./usuario";

export interface Aluno extends Usuario {
    idade?: number;
    formacao?: string;
}
