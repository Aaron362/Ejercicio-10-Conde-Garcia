import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyBGoQFVI_jaARNO7Uiol8Q5KYl63DNLErg'

  userToken: string | undefined;

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient) {
    this.leerToken();
  }


  logout(){

   }

  login(usuario: UsuarioModel) {

    const authData =  {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }:signInWithPassword?key=${ this.apikey}`,
      authData
    ).pipe(
      map( resp =>  {
       this.guardarToken( resp['idToken']);
       return resp;
      })
    );
  }


  nuevoUsuario( usuario: UsuarioModel)  {

    const authData =  {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }:signUp?key=${ this.apikey}`,
      authData
    ).pipe(
      map( resp =>  {
       this.guardarToken( resp['idToken']);
       return resp;
      })
    );

  }



  private guardarToken ( idToken: string)  {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }



  leerToken() {
      const token = localStorage.getItem('token');
      this.userToken = token !== null ? token : '';

      return this.userToken;
    }

}
