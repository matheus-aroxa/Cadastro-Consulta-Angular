import { v4 as uuid } from 'uuid';

export class Cliente {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  estado?: string;
  cidade?: string;
  dataNascimento?: string;
  deletando?: boolean;

  static newCliente(){
    let cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}
