import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { XtremePoint } from '../Model/XtremePoint';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

const TOKEN_KEY = 'access_token';
const httpOptions = {
	headers: new HttpHeaders({
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + TOKEN_KEY // Ajoutez des en-têtes supplémentaires selon vos besoins
	})
};

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  url = environment.url;
  
  addToCart(item: { id: any; titre: any; prix: any; qty: number; }) {
    throw new Error('Method not implemented.');
  }

  private keyPanier = 'panier';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController : AlertController
  ){  
    this.storage.create();
  }

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

  payements(credentials:any) {  
	console.log("Traitements Payements");
		return this.http.post(`${this.url}/paiements`, credentials, httpOptions).pipe(
			catchError((e) => {
				this.showAlert(e.error.message);
				throw new Error(e);
			})
		);
	}

  showAlert(msg:any) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Erreur Enregistrement',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}

}