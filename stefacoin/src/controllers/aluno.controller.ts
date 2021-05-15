import Aluno from '../entities/aluno.entity';
import AlunoRepository from '../repositories/aluno.repository';
import { FilterQuery } from '../utils/database/database';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';

export default class AlunoController {
  async obterPorId(id: number): Promise<Aluno> {
    Validador.validarParametros([{ id }]);
    return await AlunoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Aluno> = {}): Promise<Aluno> {
    return await AlunoRepository.obter(filtro);
  }

  async listar(filtro: FilterQuery<Aluno> = {}): Promise<Aluno[]> {
    filtro.tipo = 2;
    return await AlunoRepository.listar(filtro);
  }

  async incluir(aluno: Aluno) {
    const { nome, formacao, idade, email, senha } = aluno;
    Validador.validarParametros([{ nome }, { formacao }, { idade }, { email }, { senha }]);

    let filtroEmail: FilterQuery<Aluno> = {};
    filtroEmail.email = email;
    let retorno  = await AlunoRepository.obter(filtroEmail)

    if(retorno){
      throw new BusinessException(`Aluno ${retorno.nome} já usa o email ${retorno.email}. Entre em contato com a Direção.`) 
    }
    aluno.tipo = 2;
    const id = await AlunoRepository.incluir(aluno);
    return new Mensagem('Aluno incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, aluno: Aluno, emailLogado: string) {

    const { nome, email, senha } = aluno;

    Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);

    let alunoBanco = await AlunoRepository.obterPorId(id);
    if (emailLogado != alunoBanco.email) {
      throw new BusinessException('Você não pode alterar esse usuário!')
    }
    aluno.email = alunoBanco.email;

    await AlunoRepository.alterar({ id }, aluno);
    return new Mensagem('Aluno alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number, tipoUsuario: number) {
    Validador.validarParametros([{ id }]);

    if (tipoUsuario === 2) {
      throw new BusinessException('Alunos não podem excluir dados.');
    } 

    await AlunoRepository.excluir({ id });
    return new Mensagem('Aluno excluido com sucesso!', {
      id,
    });
  }
}
