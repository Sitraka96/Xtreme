export class XtremePoint{
    id_xtremepoint: string = "";
    titre_xtremepoint: string = "";
    point_xtremepoint: number;
    date_xtremepoint: string ="";
    prix_xtremepoint:number;
  
    constructor(id_xtremepoint = "", titre_xtremepoint = "", point_xtremepoint = 0, date_xtremepoint = "", prix_xtremepoint = 0){
      this.id_xtremepoint = id_xtremepoint;
      this.titre_xtremepoint = titre_xtremepoint;
      this.point_xtremepoint = point_xtremepoint;
      this.date_xtremepoint = date_xtremepoint;
      this.prix_xtremepoint = prix_xtremepoint;
    }
}