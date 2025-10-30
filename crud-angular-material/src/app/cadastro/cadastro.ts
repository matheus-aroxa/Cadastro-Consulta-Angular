import {Component, inject} from '@angular/core';
import { OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Cliente } from './cliente';
import { Clientes } from '../clientes';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {Estado} from '../estado';
import {BrasilApi} from '../brasil-api';
import {Municipio} from '../municipio';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatButton,
    NgxMaskDirective,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit{
  atualizando: boolean = false;
  cliente: Cliente = Cliente.newCliente();
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  cidades: Municipio[] = [];

  constructor(private service: Clientes, private route: ActivatedRoute, private router: Router, private api: BrasilApi) { }

  salvar(){
    if(!this.atualizando){
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.snack.open('Cliente salvo com sucesso!','OK');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.snack.open('Cliente atualizado com sucesso!','OK');

    }
  }

  clear(){
    let id = this.cliente.id;
    this.cliente = new Cliente();
    this.cliente.id = id;
  }

  ngOnInit(){
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query['params'];
      const id = params['id'];
      if(id){
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })


    this.api.findAll().subscribe({
      next: (response) => { this.estados = response },
      error: (err) => { console.error(err) }
    })

    if(this.cliente.estado) {
      this.api.findAllMunicipios(this.cliente.estado).subscribe({
        next: (response) => { this.cidades = response },
        error: (err) => { console.error(err) }
      })
    }
  }

  selectionEstado(event: MatSelectChange){
    this.service.selectionEstado(event).subscribe({
      next: (response) => {this.cidades = response},
      error: (err) => console.error(err)
    });
  }
}
