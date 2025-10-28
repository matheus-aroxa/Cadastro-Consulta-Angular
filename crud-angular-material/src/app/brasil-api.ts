import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from './estado';
import {Municipio} from './municipio';

@Injectable({
  providedIn: 'root'
})
export class BrasilApi {

  private baseUrl: string = "https://brasilapi.com.br/api/ibge/uf/v1";

  constructor(private http: HttpClient) {}

  findAll():Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseUrl);
  }

  findAllMunicipios(sigla: string):Observable<Municipio[]> {
    return this.http.get<Municipio[]>("https://brasilapi.com.br/api/ibge/municipios/v1/" + sigla + "?providers=dados-abertos-br,gov,wikipedia");
  }

}
