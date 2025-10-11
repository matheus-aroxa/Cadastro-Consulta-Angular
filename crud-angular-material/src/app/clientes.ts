import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class Clientes {

  static STORAGE_KEY = 'REPO_CLIENTES';

  salvar(cliente: Cliente){
    let clientes = this.obterStorage();
    clientes.push(cliente);
    localStorage.setItem(Clientes.STORAGE_KEY, JSON.stringify(clientes));
  }

  private obterStorage(): Cliente[] {
    const repositorioCliente = localStorage.getItem(Clientes.STORAGE_KEY);
    if (repositorioCliente) {
      return JSON.parse(repositorioCliente);
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(Clientes.STORAGE_KEY, JSON.stringify(clientes));
    return clientes;
  }

  pesquisarClientes(nome: string): Cliente[] {
    return this.obterStorage();
  }
}
