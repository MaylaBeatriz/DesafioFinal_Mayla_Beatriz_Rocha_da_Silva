import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { Mensagem } from 'src/app/models/mensagem';
import { Professor } from 'src/app/models/professor';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro-curso.component.html',
  styleUrls: ['./cadastro-curso.component.css']
})
export class CadastroCursoComponent implements OnInit {

  cadastroForm: FormGroup;
  professores: Professor[];
  curso: Curso;
  private idCurso: number;
  mensagem: Mensagem;

  constructor(private professorService: ProfessorService, private cursoService: CursoService,
    private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.professorService.listar().subscribe((dado: Professor[]) => {
      this.professores = dado;
    });
    this.idCurso = this.route.snapshot.params['id'];
    if (this.idCurso) {
      this.cursoService.obter(this.idCurso).subscribe((dado: Curso) => {
        this.novoOuAtualizar(dado);
      })
    } else {
      this.novoOuAtualizar(null);
    }
  }

  private novoOuAtualizar(curso: Curso | null) {
    if (curso) {
      this.cadastroForm = this.fb.group({
        nome: new FormControl(curso.nome, Validators.required),
        descricao: new FormControl(curso.descricao, Validators.required),
        idProfessor: new FormControl('', Validators.required),
        aulas: this.fb.array([])
      })
    } else {
      this.cadastroForm = this.fb.group({
        nome: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required)
      });
    }
  }

  get aulas(): FormArray {
    return this.cadastroForm.get("aulas") as FormArray;
  }

  novaAula(): FormGroup {
    return this.fb.group({
      nome: new FormControl('', Validators.required),
      duracao: new FormControl('', Validators.required),
      topicos: new FormControl('', Validators.required)
    })
  }

  adicionarAula(): void {
    this.aulas.push(this.novaAula());
  }

  removerAula(i: number): void {
    this.aulas.removeAt(i);
  }

  cadastrarCurso() {
    this.curso = {};
    this.curso.nome = this.cadastroForm.get("nome")?.value;
    this.curso.descricao = this.cadastroForm.get("descricao")?.value;
    this.curso.idProfessor = this.cadastroForm.get("idProfessor")?.value.id;
    this.curso.aulas = this.aulas.value;

    if (this.idCurso) {
      this.cursoService.alterar(this.idCurso, this.curso).subscribe((retorno: Mensagem) => {
        this.mensagem = retorno;
        this.mensagem.sucesso = true;
      },
        (retornoErro: any) => {
          this.mensagem = {
            mensagem: retornoErro.error.message
          }
          this.mensagem.sucesso = false;
        })
    } else {
      this.cursoService.incluir(this.curso).subscribe((retorno: Mensagem) => {
        this.mensagem = retorno;
        this.mensagem.sucesso = true;
      },
        (retornoErro: any) => {
          this.mensagem = {
            mensagem: retornoErro.error.message
          }
          this.mensagem.sucesso = false;
        });
    }

  }

}
