import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RetraitService } from '../Services/retrait.service';


@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RetraitComponent implements OnInit {

  currentPage: number = 1;
  pageSize: number = 4; // Nombre d'éléments à afficher par page
  totalItems: number = 0; // Total d'éléments dans votre source de données

  payments: any[] = []; // Déclarez la propriété payments ici
  paginatedPayments: any[] = []; // Déclarez la propriété paginatedPayments ici
  totalPages: number = 0; // Déclarez la propriété totalPages ici

  constructor(private retraitService: RetraitService) { }


  ngOnInit(): void {
    this.retraitService.getAllRetraits().subscribe(
      (retraits: any[]) => {
        // Mettez à jour les données de paiement avec les retraits récupérés depuis l'API
        this.payments = retraits;
  
        // Mettez à jour le nombre total d'éléments
        this.totalItems = this.payments.length;
  
        // Calculez le nombre total de pages
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  
        // Initialisez les données paginées avec la première page
        this.updatePaginatedPayments();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  // Méthode pour passer à la page précédente
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPayments();
    }
  }

  // Méthode pour passer à la page suivante
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPayments();
    }
  }

  // Met à jour les données paginées en fonction de la page en cours
  updatePaginatedPayments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPayments = this.payments.slice(startIndex, endIndex);
  }
  validateStatus(payment: any) {
    if (payment.status === 'En attente') {
      payment.isLoading = true; // Définir isLoading à true pour désactiver le bouton
      setTimeout(() => {
        payment.status = 'Validé';
        payment.isStatusValidated = true;
        payment.isLoading = false; // Définir isLoading à false après 3 secondes pour réactiver le bouton
      }, 3000);
    }
  }
  

}
