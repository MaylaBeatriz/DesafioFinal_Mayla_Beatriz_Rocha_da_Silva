import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor/';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  listar() {
    return this.httpClient.get(URL);
  }

  obter(idProfessor: any) {
    let URLcomId = URL + `${idProfessor}`;
    return this.httpClient.get(URLcomId);
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar(idProfessor: any, professor: Professor): Observable<Mensagem> {
    let URLcomId = URL + `${idProfessor}`;
    return this.httpClient.put<Mensagem>(URLcomId, professor);
  }

  excluir(idProfessor: any) {
    let URLcomId = URL + `${idProfessor}`;
    return this.httpClient.delete(URLcomId);
  }
}
