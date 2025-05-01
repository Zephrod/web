import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../../core/services/etudiant.service'; // chemin relatif
import { Router } from '@angular/router'; // Importer Router si nécessaire

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  etudiants: any[] = [];

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getAll().subscribe(data => {
      this.etudiants = data;
    });
  }
}
