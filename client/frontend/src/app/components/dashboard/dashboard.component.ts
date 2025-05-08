import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser$: Observable<any>; // Or your actual user type

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }
}
