import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { Mensagem } from 'src/app/models/mensagem';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-detalhar-curso',
  templateUrl: './detalhar-curso.component.html',
  styleUrls: ['./detalhar-curso.component.css']
})
export class DetalharCursoComponent implements OnInit {

  curso: Curso;
  mensagem: Mensagem;

  constructor(private route: ActivatedRoute, private cursoService: CursoService) { }

  ngOnInit() {
    const idCurso = this.route.snapshot.params['id'];
    this.detalharCurso(idCurso);
  }

  detalharCurso(idCurso: number) {
    this.cursoService.obter(idCurso).subscribe((dado: Curso) => {
      this.curso = dado;
    },
    (retornoErro: any) => {
      this.mensagem = {
        mensagem: retornoErro.error.message
      }
      this.mensagem.sucesso = false;
    });
  }

}
