import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  constructor( private auth: AuthService,
                private router: Router) { }

                ngOnInit() {
                  const storedEmail = localStorage.getItem('email');
                  if (storedEmail !== null) {
                    this.usuario.email = storedEmail;
                    this.recordarme = true;
                  }
                }


  login( form: NgForm)  {
    if(   form.invalid  ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info', // Use 'icon' instead of 'type'
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario)
    .subscribe( resp => {

      console.log(resp);
      Swal.close();

      if( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }





      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error', // Use 'icon' instead of 'type'
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }
}
