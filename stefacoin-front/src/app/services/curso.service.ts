import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Curso } from '../models/curso';

const URL = 'http://localhost:3000/stefanini/curso/';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private httpClient: HttpClient) {}

  listar() {
    return this.httpClient.get(URL);
  }

  obter(idCurso: any) {
    let URLcomId = URL + `${idCurso}`;
    return this.httpClient.get(URLcomId);
  }

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  alterar(idCurso: any, curso: Curso): Observable<Mensagem> {
    let URLcomId = URL + `${idCurso}`;
    return this.httpClient.put<Mensagem>(URLcomId, curso);
  }

  excluir(idCurso: any) {
    let URLcomId = URL + `${idCurso}`;
    return this.httpClient.delete(URLcomId);
  }
}
