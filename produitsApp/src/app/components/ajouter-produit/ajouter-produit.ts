import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../interfaces/produit';

@Component({
  selector: 'app-ajouter-produit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './ajouter-produit.html',
  styleUrl: './ajouter-produit.css'
})
export class AjouterProduitComponent {
  produit: Produit = {
    nom: '',
    categorie: '',
    prix: 0,
    stock: 0,
    description: ''
  };
  erreur = '';
  succes = false;

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ajouter() {
    this.produitService.ajouterProduit(this.produit).subscribe({
      next: () => {
        this.succes = true;
        setTimeout(() => {
          this.router.navigate(['/produits']);
        }, 2000);
      },
      error: () => {
        this.erreur = 'Erreur lors de l\'ajout de nouveau produit';
      }
    });
  }
}