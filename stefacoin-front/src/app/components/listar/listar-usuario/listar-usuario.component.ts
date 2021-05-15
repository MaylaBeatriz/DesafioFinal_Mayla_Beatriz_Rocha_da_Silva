import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit, Usuario {
  usuario: Usuario;
  email?: string;
  senha?: string;
  nome?: string;
  tipo?: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
    })
  };

  showHeader() {
    return this.authService.isAuthenticated();
  };

}
