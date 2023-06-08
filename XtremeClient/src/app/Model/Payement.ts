export class Paiement{
    id: number = 0;
    id_client: number = 0;
    email_client: string = "";
    montant: number = 0;
    description: string = "";
    statut: string = "";
    paypal_payment_id: string = "";
    paypal_approval_url: string = "";
    payerId: string = "";
}