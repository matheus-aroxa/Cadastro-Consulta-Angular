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
    let resultado = this.obterStorage();

    if(!nome){
      return resultado;
    }

    return resultado.filter(cliente => cliente.nome?.indexOf(nome) !== -1);
  }

  buscarClientePorId(id: string) {
    let clientes = localStorage.getItem(Clientes.STORAGE_KEY);
    if (clientes) {
      let arr: Cliente[] = JSON.parse(clientes);
      return arr.find(cliente => cliente.id === id);
    }
    return undefined;
  }

  atualizar(cliente: Cliente){
    let storage = this.obterStorage();
    for(let index = 0; index < storage.length; index++) {
      if(storage[index].id === cliente.id){
        storage[index] = cliente;
        localStorage.setItem(Clientes.STORAGE_KEY, JSON.stringify(storage));
      }
    }
  }

  deletar(id: string){
    let storage = this.obterStorage();
    for(let index = 0; index < storage.length; index++) {
      if(storage[index].id === id){
        storage.splice(index, 1);
        localStorage.setItem(Clientes.STORAGE_KEY, JSON.stringify(storage));
      }
    }
  }
}
