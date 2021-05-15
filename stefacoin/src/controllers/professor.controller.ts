import Professor from '../entities/professor.entity';
import ProfessorRepository from '../repositories/professor.repository';
import CursoRepository from '../repositories/curso.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import Curso from '../entities/curso.entity';
import BusinessException from '../utils/exceptions/business.exception';

export default class ProfessorController {

  async obterPorId(id: number): Promise<Professor> {
    Validador.validarParametros([{ id }]);
    return await ProfessorRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<Professor> {
    return await ProfessorRepository.obter(filtro);
  }

  async listar(filtro: FilterQuery<Professor> = {}): Promise<Professor[]> {
    filtro.tipo = 1;
    return await ProfessorRepository.listar(filtro);
  }

  async incluir(professor: Professor) {
    const { nome, email, senha } = professor;

    Validador.validarParametros([{ nome }, { email }, { senha }]);
    let filtroEmail: FilterQuery<Professor> = {}
    filtroEmail.email = email;
    let retorno = await ProfessorRepository.obter(filtroEmail)

    if (retorno) {
      throw new BusinessException(`Professor ${retorno.nome} já usa o email ${retorno.email}. Entre em contato com a Direção.`)
    }
    professor.tipo = 1;
    const id = await ProfessorRepository.incluir(professor);
    return new Mensagem('Professor incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, professor: Professor, emailLogado: string) {

    const { nome, email, senha } = professor;

    Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);

    let professorBanco = await ProfessorRepository.obterPorId(id);
    if (emailLogado != professorBanco.email) {
      throw new BusinessException('Você não pode alterar esse usuário!')
    }
    professor.email = professorBanco.email;

    await ProfessorRepository.alterar({ id }, professor);
    return new Mensagem('Professor alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number, emailLogado: string, tipoUsuario: number) {
    Validador.validarParametros([{ id }]);

    let professorBanco = await ProfessorRepository.obterPorId(id);
    if (emailLogado === professorBanco.email) {
      throw new BusinessException('Você não pode se excluir!');
    } else if (tipoUsuario === 2) {
      throw new BusinessException('Alunos não podem excluir dados.');
    }

    let filtroCurso: FilterQuery<Curso> = {};
    filtroCurso.idProfessor = id;

    let cursosProfessor = await CursoRepository.listar(filtroCurso);
    if (cursosProfessor.length > 0) {
      throw new BusinessException('Este professor está vinculado a um curso.');
    }

    await ProfessorRepository.excluir({ id });
    return new Mensagem('Professor excluido com sucesso!', {
      id,
    });
  }
}
