import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrls: ['./validacao.component.css']
})
export class ValidacaoComponent implements OnInit {

  @Input() campo: FormControlName | null | AbstractControl = null
  @Input() name: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
