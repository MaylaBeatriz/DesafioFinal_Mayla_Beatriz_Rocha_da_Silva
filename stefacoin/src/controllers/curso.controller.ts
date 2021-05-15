import Aluno from '../entities/aluno.entity';
import AlunoMatriculado from '../entities/alunoMatriculado.entity';
import Curso from '../entities/curso.entity';
import AlunoRepository from '../repositories/aluno.repository';
import alunoMatriculadoRepository from '../repositories/alunoMatriculado.repository';
import CursoRepository from '../repositories/curso.repository';
import { FilterQuery } from '../utils/database/database';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';

export default class CursoController {
  async obterPorId(id: number): Promise<Curso> {
    Validador.validarParametros([{ id }]);
    return await CursoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Curso> = {}): Promise<Curso> {
    return await CursoRepository.obter(filtro);
  }

  async listar(filtro: FilterQuery<Curso> = {}): Promise<Curso[]> {
    return await CursoRepository.listar(filtro);
  }

  async listarCurso(curso: Curso) {
    return await CursoRepository.listarCurso(curso);
  }

  async incluir(curso: Curso, tipoUsuario: number) {
    const { nome, descricao, aulas, idProfessor } = curso;

    Validador.validarParametros([{ nome }, { descricao }, { aulas }, { idProfessor }]);

    if (tipoUsuario === 2) {
      throw new BusinessException('Somente professores podem cadastrar cursos.')
    }

    const id = await CursoRepository.incluir(curso);
    return new Mensagem('Curso incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, curso: Curso, tipoUsuario: number) {
    const { nome, descricao, aulas, idProfessor } = curso;
    Validador.validarParametros([{ id }, { nome }, { descricao }, { aulas }, { idProfessor }]);

    if (tipoUsuario === 2) {
      throw new BusinessException('Somente professores podem alterar cursos.')
    }

    await CursoRepository.alterar({ id }, curso);
    return new Mensagem('Curso alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number, tipoUsuario: number) {
    Validador.validarParametros([{ id }]);

    if (tipoUsuario === 2) {
      throw new BusinessException('Alunos não podem excluir dados.');
    };

    await CursoRepository.excluir({ id });
    return new Mensagem('Curso excluido com sucesso!', {
      id,
    });
  }

  async matricular(idCurso: number, emailLogado: string) {

    Validador.validarParametros([{ idCurso }]);

    let filtroEmail: FilterQuery<Aluno> = {};
    filtroEmail.email = emailLogado;
    let alunoBanco = await AlunoRepository.obter(filtroEmail);

    if (alunoBanco.tipo === 1) {
      throw new BusinessException('Somente alunos podem se matricular.')
    }

    let curso = await CursoRepository.obterPorId(idCurso);
    if (!curso) {
      throw new BusinessException('Esse curso não existe.')
    }

    let filtroMatriculado: FilterQuery<AlunoMatriculado> = {};
    filtroMatriculado.idAluno = alunoBanco.id;
    filtroMatriculado.idCurso = curso.id;
    
    let isMatriculado = await alunoMatriculadoRepository.listar(filtroMatriculado);

    if(isMatriculado.length > 0) {
      throw new BusinessException('Você já está matriculado nesse curso.')
    }

    const alunoMatriculado: AlunoMatriculado = new AlunoMatriculado();
    alunoMatriculado.idCurso = curso.id;
    alunoMatriculado.idAluno = alunoBanco.id;
    const id = await alunoMatriculadoRepository.incluir(alunoMatriculado);
    return new Mensagem('Aluno matriculado com sucesso!', {
      id,
    });
  }
}
