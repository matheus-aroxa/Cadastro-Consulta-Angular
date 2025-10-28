import { Component, inject, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta {
  colunasTabela: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "estado", "cidade", "acoes"];
  listaClientes: Cliente[] = [];
  nome: string = '';
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private service: Clientes, private router: Router) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes(this.nome);
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nome);
  }

  prepararParaEditar(id: string){
    this.router.navigate([`/cadastro`], { queryParams: { "id": id} });
  }

  prepararParaDeletar(cliente: Cliente){
    cliente.deletando = true;
  }

  confirmarDelecao(id: string){
    this.service.deletar(id);
    this.listaClientes = this.service.pesquisarClientes(this.nome);
    this.snack.open('Cliente deletado com sucesso!', 'OK')
  }
}
