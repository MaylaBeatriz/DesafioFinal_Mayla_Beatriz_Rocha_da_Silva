import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { Mensagem } from 'src/app/models/mensagem';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {

  alunos: Aluno[];
  mensagem: Mensagem;

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.listarAluno();
  }

  listarAluno() {
    this.alunoService.listar().subscribe((dado: Aluno[]) => {
      this.alunos = dado;
    });
  }

  excluirAluno(idAluno: number) {
    this.alunoService.excluir(idAluno).subscribe((retorno: Mensagem) => {
      this.mensagem = retorno;
      this.mensagem.sucesso = true;
      this.listarAluno();
    },
      (retornoErro: any) => {
        this.mensagem = {
          mensagem: retornoErro.error.message
        }
        this.mensagem.sucesso = false;
      });
  }

}
