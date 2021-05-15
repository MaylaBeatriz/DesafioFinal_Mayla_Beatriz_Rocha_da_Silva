import Aula from '../models/aula.model';
import Aluno from './aluno.entity';
import Entity from './entity';

export default class Curso extends Entity {
  nome: string;
  descricao: string;
  idProfessor: number;
  aulas: Aula[];
  alunos?: Aluno[];

  constructor() {
    super();
  }
}
