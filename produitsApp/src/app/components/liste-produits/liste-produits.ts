import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { AuthService } from '../../services/auth.service';
import { Produit } from '../../interfaces/produit';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css'
})
export class ListeProduitsComponent implements OnInit {
  produits: Produit[] = [];
  erreur = '';
  isAdmin = false;

  constructor(
    private produitService: ProduitService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.getProduits();
  }

  getProduits() {
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: () => this.erreur = 'Erreur lors du chargement des produits'
    });
  }

  supprimerProduit(id: number) {
    this.produitService.supprimerProduit(id).subscribe({
      next: () => this.getProduits(),
      error: () => this.erreur = 'Erreur lors de la suppression'
    });
  }
}