import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mensagem } from 'src/app/models/mensagem';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  cadastroForm: FormGroup;
  professor: Professor;
  private idProfessor: number;
  mensagem: Mensagem;

  constructor(private professorService: ProfessorService, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.idProfessor = this.route.snapshot.params['id'];
    if (this.idProfessor) {
      this.professorService.obter(this.idProfessor).subscribe((dado: Professor) => {
        this.novoOuAtualizar(dado);
      })
    } else {
      this.novoOuAtualizar(null);
    }
  }

  private novoOuAtualizar(professor: Professor | null) {
    if (professor) {
      this.cadastroForm = this.fb.group ({
        nome: new FormControl(professor.nome, Validators.required),
        email: new FormControl(professor.email, Validators.required),
        senha: new FormControl('', Validators.required),
      });
    } else {
      this.cadastroForm = this.fb.group ({
        nome: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
      });
    }
  }

  cadastrarProfessor = () => {
    this.professor = {};
    this.professor.nome = this.cadastroForm.get("nome")?.value;
    this.professor.email = this.cadastroForm.get("email")?.value;
    this.professor.senha = this.cadastroForm.get("senha")?.value;

    if(this.idProfessor) {
      this.professorService.alterar(this.idProfessor, this.professor).subscribe((retorno: Mensagem) => {
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
      this.professorService.incluir(this.professor).subscribe((retorno: Mensagem) => {
        this.mensagem = retorno;
        this.mensagem.sucesso = true;
      },
        (retornoErro: any) => {
          this.mensagem = {
            mensagem: retornoErro.error.message
          }
          this.mensagem.sucesso = false;
        })
    }    
  }

}
