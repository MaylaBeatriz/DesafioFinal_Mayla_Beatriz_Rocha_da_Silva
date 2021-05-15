import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { Mensagem } from 'src/app/models/mensagem';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  cursos: Curso[];
  mensagem: Mensagem;

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.listarCurso();
  }

  listarCurso() {
    this.cursoService.listar().subscribe((dado: Curso[]) => {
      this.cursos = dado;
    });
  }

  excluirCurso(idCurso: number) {
    this.cursoService.excluir(idCurso).subscribe((retorno: Mensagem) => {
      this.mensagem = retorno;
      this.mensagem.sucesso = true;
      this.listarCurso();
    },
      (retornoErro: any) => {
        this.mensagem = {
          mensagem: retornoErro.error.message
        }
        this.mensagem.sucesso = false;
      });
  }

}
