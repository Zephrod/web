import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private etudiants = [
    { id: 1, nom: 'Jean Dupont', age: 20 },
    { id: 2, nom: 'Fatou Ndiaye', age: 22 }
  ];

  getAll() {
    return of(this.etudiants); // simule une requête HTTP
  }
}

