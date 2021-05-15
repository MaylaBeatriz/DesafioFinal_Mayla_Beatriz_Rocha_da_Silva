import Curso from '../entities/curso.entity';
import Aluno from '../entities/aluno.entity';
import { Tables } from '../utils/tables.enum';
import Repository from './repository';

class CursoRepository extends Repository<Curso> {
  constructor() {
    super(Tables.CURSO);
  }

  async listarCurso(curso: Curso){
    if (curso.idProfessor) {
      return curso;
    }
  }
}

export default new CursoRepository();
