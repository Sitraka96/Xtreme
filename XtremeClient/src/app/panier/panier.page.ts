import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { timeStamp } from 'console';
import { HttpClient } from '@angular/common/http';
import { loadScript, PayPalScriptOptions } from '@paypal/paypal-js';

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
  years: number[] = [];
  months: string[] = [];
  data:any = null;
  id_client: number = 0;
  email_client: string = "";
  montant: number = 0;
  description: string = "";
  paypal_payment_id: string = "";
  paypal_approval_url: string = "";
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private helper: JwtHelperService,
    private authService: AuthService,
    private storage: Storage,
    private panierService: PanierService,
  ) {
    this.years = this.generateYears();
    this.months = [
      'Expiry Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ];
  }

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
      //console.log(`Produit ${i+1}: prix=${prix}, qty=${qty}, total=${produitTotal}`);
      total += produitTotal;
    }
    //console.log(`Total: ${total}`);
    return total;
  }

  deleteCart() {
    this.produits = [];
    this.qty = 1;
    this.total = 0;
  }

  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const futureYears = 10; // Nombre d'années futures à afficher

    const years = [];
    for (let i = currentYear; i <= currentYear + futureYears; i++) {
      years.push(i);
    }

    return years;
  }

  paypalButton() {
    console.log("payment paypal");
   
  }

  async ionViewDidEnter() {
    let paypal;
    try {
      paypal = await loadScript({ clientId: "AUxLk0gxebjIABeztTX-1UDbtDwXBrAYmNLTfGYm2oUVm9xlh-3VBIjGfZc9_OCdalBytB1PkKIfL86c" });
    } catch (error) {
      console.error("Failed to load the PayPal JS SDK script", error);
    }
  
    if (paypal) {
      try {
        if (typeof paypal.Buttons === "function") {
          await paypal.Buttons({
            // 3. Configurer la transaction
            createOrder: function (_data: any, actions: any) {
              // Les produits à payer avec leurs details
              var produits = [
                {
                  name: "Produit 1",
                  description: "Description du produit 1",
                  quantity: 1,
                  unit_amount: {
                    value: 1, currency_code
                      : "USD"
                  }
                },
              ];
              // Le total des produits
              var total_amount = produits.reduce(function (total, product) {
                return total + product.unit_amount.value *
                  product.quantity;
              }, 0);
              // La transaction
              return actions.order.create({
                purchase_units: [{
                  items: produits,
                  amount: {
                    value: total_amount,
                    currency_code: "USD",
                    breakdown: {
                      item_total: {
                        value:
                          total_amount, currency_code: "USD"
                      }
                    }
                  }
                }]
              });
            },
            // 4. Capturer la transaction après l'approbation de l'utilisateur
            onApprove: (data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                // Récupérer les détails du paiement
                const amount = details.purchase_units[0].amount.value;
                const emailAddress = details.payer.email_address;
                const name = details.payer.name.given_name;
                const payerId = details.payer.payer_id;
                const paymentId = details.id;
                const transactionIDValue = details.purchase_units[0].payments.captures[0].id;
            
                // Enregistrer les détails du paiement dans votre base de données
                const paymentData = {
                  montant: amount,
                  email_address: emailAddress,
                  name: name,
                  payer_id: payerId,
                  payment_id: paymentId,
                  transactionIDValue: transactionIDValue
      
                };
            
                this.http.post('http://localhost:8080/enregistrer-paiement', paymentData)
                  .subscribe();
            
                // Afficher un message de succès
                alert(name + ', votre transaction est effectuée. Vous allez recevoir une notification très bientôt lorsque nous validons votre paiement.');
              });
            },
            
            // 5. Annuler la transaction
            onCancel: function (data: any) {
              alert("Transaction annulée !");
            }
          }).render("#paypalButton");
        } else {
          console.error("Failed to render the PayPal Buttons: paypal.Buttons is not a function");
        }
      } catch (error) {
        console.error("Failed to render the PayPal Buttons", error);
      }
    }
  }

  onRegister() {
    const credentials = {
      email: this.email_client,
      montant: this.montant
    };
  
    this.panierService.payements(credentials)
    .subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur
        console.log(response);
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      }
    });
  }
}