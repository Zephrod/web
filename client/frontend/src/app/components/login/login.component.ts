import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.message = 'Connexion réussie !';
        console.log(res);
      },
      error: (err) => {
        this.message = 'Erreur de connexion';
        console.error(err);
      }
    });
  }
}
