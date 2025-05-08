import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentials = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  message = '';

  constructor(private router: Router) {}

  register() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.message = "❌ Les mots de passe ne correspondent pas.";
    } else {
      this.message = "✅ Compte créé (simulation)";
      setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}

}
