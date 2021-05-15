import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuardService } from './guards/auth-guard.service'; // deixar as rotas privadas
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListarAlunoComponent } from './components/listar/listar-aluno/listar-aluno.component';
import { ListarProfessorComponent } from './components/listar/listar-professor/listar-professor.component';
import { ListarCursoComponent } from './components/listar/listar-curso/listar-curso.component';
import { CadastroProfessorComponent } from './components/cadastrar/cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './components/cadastrar/cadastro-aluno/cadastro-aluno.component';
import { CadastroCursoComponent } from './components/cadastrar/cadastro-curso/cadastro-curso.component';
import { DetalharCursoComponent } from './components/detalhar-curso/detalhar-curso.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro-professor',
    component: CadastroProfessorComponent,
  },
  {
    path: 'alterar-professor/:id',
    component: CadastroProfessorComponent,
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
  },
  {
    path: 'alterar-aluno/:id',
    component: CadastroAlunoComponent,
  },
  {
    path: 'cadastro-curso',
    component: CadastroCursoComponent,
  },
  {
    path: 'alterar-curso/:id',
    component: CadastroCursoComponent,
  },
  {
    path: 'listar-professor',
    component: ListarProfessorComponent,
  },
  {
    path: 'listar-aluno',
    component: ListarAlunoComponent,
  },
  {
    path: 'listar-curso',
    component: ListarCursoComponent,
  },
  {
    path: 'detalhar-curso/:id',
    component: DetalharCursoComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
