import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListarUsuarioComponent } from './components/listar/listar-usuario/listar-usuario.component';
import { ListarProfessorComponent } from './components/listar/listar-professor/listar-professor.component';
import { ListarAlunoComponent } from './components/listar/listar-aluno/listar-aluno.component';
import { ListarCursoComponent } from './components/listar/listar-curso/listar-curso.component';
import { CadastroProfessorComponent } from './components/cadastrar/cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './components/cadastrar/cadastro-aluno/cadastro-aluno.component';
import { CadastroCursoComponent } from './components/cadastrar/cadastro-curso/cadastro-curso.component';
import { ValidacaoComponent } from './components/validacao/validacao.component';
import { AlertaComponent } from './components/alerta/alerta/alerta.component';
import { DetalharCursoComponent } from './components/detalhar-curso/detalhar-curso.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    ListarUsuarioComponent,
    ListarProfessorComponent,
    ListarAlunoComponent,
    ListarCursoComponent,
    CadastroProfessorComponent,
    CadastroAlunoComponent,
    CadastroCursoComponent,
    ValidacaoComponent,
    AlertaComponent,
    DetalharCursoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
