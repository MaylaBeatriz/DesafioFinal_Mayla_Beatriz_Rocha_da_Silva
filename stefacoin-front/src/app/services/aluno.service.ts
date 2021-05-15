import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Aluno } from '../models/aluno';

const URL = 'http://localhost:3000/stefanini/aluno/';

@Injectable({
  providedIn: 'root', 
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  listar() {
    return this.httpClient.get(URL);
  }

  obter(idAluno: any) {
    let URLcomId = URL + `${idAluno}`;
    return this.httpClient.get(URLcomId);
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aluno);
  } 

  alterar(idAluno: any, aluno: Aluno): Observable<Mensagem> {
    let URLcomId = URL + `${idAluno}`;
    return this.httpClient.put(URLcomId, aluno);
  }

  excluir(idAluno: any) {
    let URLcomId = URL + `${idAluno}`;
    return this.httpClient.delete(URLcomId);
  }
}
