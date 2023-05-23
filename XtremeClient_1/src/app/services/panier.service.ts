import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { XtremePoint } from '../Model/XtremePoint';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  addToCart(item: { id: any; titre: any; prix: any; qty: number; }) {
    throw new Error('Method not implemented.');
  }

  private keyPanier = 'panier';

  constructor(private storage: Storage) { }

  async getPanier(): Promise<XtremePoint[]> {
    const panier = await this.storage.get(this.keyPanier);
    return panier || [];
  }

  async setPanier(panier: XtremePoint[]): Promise<void> {
    await this.storage.set(this.keyPanier, panier);
  }

  async ajouterProduit(produit: XtremePoint): Promise<void> {
    const panier = await this.getPanier();
    panier.push(produit);
    await this.setPanier(panier);
  }

}