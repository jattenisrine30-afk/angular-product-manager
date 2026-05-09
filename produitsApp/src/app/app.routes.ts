import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ListeProduitsComponent } from './components/liste-produits/liste-produits';
import { DetailProduitComponent } from './components/detail-produit/detail-produit';
import { AjouterProduitComponent } from './components/ajouter-produit/ajouter-produit';
import { ErrorPageComponent } from './components/error-page/error-page';
import { AccueilComponent } from './components/accueil/accueil';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [authGuard] },
  { path: 'produits', component: ListeProduitsComponent, canActivate: [authGuard] },
  { path: 'produits/:id', component: DetailProduitComponent, canActivate: [authGuard] },
  { path: 'ajouter', component: AjouterProduitComponent, canActivate: [adminGuard] },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' }
];