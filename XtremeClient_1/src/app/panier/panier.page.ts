import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  xtremepoint: any;
  qty: number = 1;
  total!: number;
  clientConnecte: any;
  panier: any;
  produits: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private helper: JwtHelperService,
    private authService: AuthService,
    private storage: Storage,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const titre = params['titre'];
      const prix = params['prix'];

      if (id && titre && prix) {
        const produit = {
          id: id,
          titre: titre,
          prix: prix
        };
        this.produits.push(produit);
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/shop');
  }

  addQuantity() {
    this.qty++;
    this.total = this.xtremepoint.prix * this.qty;
  }

  removeQuantity() {
    if (this.qty > 1) {
      this.qty--;
      this.total = this.xtremepoint.prix * this.qty;
    }
  }

  addToCart() {
    let item = {
      id: this.xtremepoint.id,
      titre: this.xtremepoint.titre,
      prix: this.xtremepoint.prix,
      qty: this.qty
    };
    this.panierService.addToCart(item);
    this.navCtrl.navigateBack('/shop');
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.produits.length; i++) {
      const produit = this.produits[i];
      const prix = produit.prix;
      const qty = produit.qty;
      const produitTotal = prix * qty;
      console.log(`Produit ${i+1}: prix=${prix}, qty=${qty}, total=${produitTotal}`);
      total += produitTotal;
    }
    console.log(`Total: ${total}`);
    return total;
  }

  deleteCart() {
    this.produits = [];
    this.qty = 1;
    this.total = 0;
  }
}