import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Cliente } from '../cadastro/cliente';
import { Clientes } from '../clientes';

@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta {
  colunasTabela: string[] = ["id", "nome", "cpf", "dataNascimento", "email"];
  listaClientes: Cliente[] = [];
  nome: string = '';

  constructor(private service: Clientes) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes(this.nome);
  }
}
