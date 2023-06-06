export class client
{
    id_client: number;
    id_steam: string;
    id_xbox: string;
    id_ps: string;
    id_gmail: string;
    nom_client:string;
    prenom_client:string;
    pseudo_client:string;
    email_client:string;
    date_de_creation:string;
    date_de_validation:string;
    date_de_modification:string;
    photo_profil:string;
    point_client:number;


    constructor(id:number,steam:string,xbox:string,ps:string,gmail:string,nom:string, prenom:string,pseudo:string,email:string,creation:string,validation:string,modification:string,photo:string,point:number){
      this.id_client = id;
      this.id_steam = steam;
      this.id_xbox = xbox;
      this.id_ps = ps;
      this.id_gmail = gmail;
      this.nom_client = nom;
      this.prenom_client = prenom;
      this.pseudo_client = pseudo;
      this.email_client = email;
      this.date_de_creation = creation;
      this.date_de_validation = validation;
      this.date_de_modification = modification;
      this.photo_profil = photo;
      this.point_client = point;



    }

  }



