import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Mensagem } from 'src/app/models/mensagem';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  
  cadastroForm: FormGroup;
  aluno: Aluno;
  private idAluno: number;
  mensagem: Mensagem;

  constructor(private alunoService: AlunoService, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.idAluno = this.route.snapshot.params['id'];
    if (this.idAluno) {
      this.alunoService.obter(this.idAluno).subscribe((dado: Aluno) => {
        this.novoOuAtualizar(dado);
      })
    } else {
      this.novoOuAtualizar(null);
    }
  }

  private novoOuAtualizar(aluno: Aluno | null) {
    if (aluno) {
      this.cadastroForm = this.fb.group({
        nome: new FormControl(aluno.nome, Validators.required),
        idade: new FormControl(aluno.idade, Validators.required),
        formacao: new FormControl(aluno.formacao, Validators.required),
        email: new FormControl(aluno.email, Validators.required),
        senha: new FormControl('', Validators.required),
      });
    } else {
      this.cadastroForm = this.fb.group({
        nome: new FormControl('', Validators.required),
        idade: new FormControl('', Validators.required),
        formacao: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
      });
    }
  }

  cadastrarAluno = () => {
    this.aluno = {};
    this.aluno.nome = this.cadastroForm.get("nome")?.value;
    this.aluno.idade = this.cadastroForm.get("idade")?.value;
    this.aluno.formacao = this.cadastroForm.get("formacao")?.value;
    this.aluno.email = this.cadastroForm.get("email")?.value;
    this.aluno.senha = this.cadastroForm.get("senha")?.value;

    if (this.idAluno) {
      this.alunoService.alterar(this.idAluno, this.aluno).subscribe((retorno: Mensagem) => {
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
      this.alunoService.incluir(this.aluno).subscribe((retorno: Mensagem) => {
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

