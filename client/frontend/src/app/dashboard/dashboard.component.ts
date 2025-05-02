import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    etudiants: 120,
    enseignants: 18,
    cours: 34,
    examens: 12,
    finances: 'Stable'
  };

  ngOnInit(): void {
    // On pourrait ici appeler un service pour charger les vraies données
  }
}