import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../interfaces/produit';

@Component({
  selector: 'app-detail-produit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-produit.html',
  styleUrl: './detail-produit.css'
})
export class DetailProduitComponent implements OnInit {
  produit: Produit | null = null;
  erreur = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produitService.getProduitById(+id).subscribe({
        next: (data) => this.produit = data,
        error: () => this.erreur = 'Produit introuvable'
      });
    }
  }
}