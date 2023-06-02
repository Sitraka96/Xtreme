import { XtremePoint } from "./XtremePoint";

export class Panier{
    item: XtremePoint;
    quantite: number;
    prix: number;
    
    constructor(XtremePoint: any, quantite=0, prix=0,){
        this.item = XtremePoint;
        this.quantite = quantite;
        this.prix = prix;
    }
}