import AlunoMatriculado from '../entities/alunoMatriculado.entity';
import { Tables } from '../utils/tables.enum';
import Repository from './repository';

class AlunoMatriculadoRepository extends Repository<AlunoMatriculado> {
  constructor() {
    super(Tables.ALUNO);
  }

  
}

export default new AlunoMatriculadoRepository();
