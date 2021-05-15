import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/mensagem';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  @Input() mensagem: Mensagem;

  constructor() { }

  ngOnInit(): void {
  }

}
