import { Component, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/mensagem';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  professores: Professor[];
  mensagem: Mensagem;

  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.listarProfessor();
  }

  listarProfessor() {
    this.professorService.listar().subscribe((dado: Professor[]) => {
      this.professores = dado;
    });
  }

  excluirProfessor(idProfessor: number) {
    this.professorService.excluir(idProfessor).subscribe((retorno: Mensagem) => {
      this.mensagem = retorno;
      this.mensagem.sucesso = true;
      this.listarProfessor();
    },
      (retornoErro: any) => {
        this.mensagem = {
          mensagem: retornoErro.error.message
        }
        this.mensagem.sucesso = false;
      });
  }

}
