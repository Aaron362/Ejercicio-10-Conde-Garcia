import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyBGoQFVI_jaARNO7Uiol8Q5KYl63DNLErg '


  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient) { }


  logout(){

   }

  login(usuario: UsuarioModel) {

  }

  nuevoUsuario( usuario: UsuarioModel)  {

  }

}
