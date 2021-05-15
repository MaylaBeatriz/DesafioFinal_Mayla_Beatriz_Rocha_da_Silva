import { Aula } from "./aula";
import { Aluno } from "./aluno";

export interface Curso {
    nome?: string;
    descricao?: string;
    idProfessor?: number;
    aulas?: Aula[];
    alunos?: Aluno[];
}
