/**
 * 
 * Rakotondrazanaka Bruno
 * 21-03-2023
 * entreprise d'accueil : A2MI
 * projet xtreme_tournoi
 * 
 */

const connexion = require('../config/dbConfig');

//constructeur pour clients
const Clients = function(client){
    this.id_rang = client.id_rang;
    this.nom_client = client.nom_client;
    this.prenom_client = client.prenom_client;
    this.pseudo_client = client.pseudo_client;
    this.email_client = client.email_client;
    this.mot_de_passe_client = client.mot_de_passe_client;
    this.point_client = client.point_client;
    this.date_de_creation = client.date_de_creation;
    this.date_de_validation = client.date_de_validation;
    this.date_de_modification = client.date_de_modification;
    this.code_de_modification = client.code_de_modification;
    this.photo_profil = client.photo_profil;
};


//methode pour enregistrer un client
Clients.createClient = (nouveau_client, result)=>{
    let requet = 'INSERT INTO clients SET ?'
    connexion.query(requet, [nouveau_client],(err, res)=>{
        if (err) 
        {  
            // console.log("err d'enregistrement client", err);
            result(null, err);        
        }
        else
        {
            console.log("client bien creer", res.insertId);
            result(null, res.insertId);
        }
    });
};

//recuperer un utilisateur par pseudo
Clients.findByPseudo = (pseudo,result) =>{

    let requet = "SELECT * FROM clients WHERE pseudo_client = ?";

    connexion.query(requet, [pseudo], (err, res)=>{
        if(err) {
            result(null, err);
        }
        else{  
            result(null, res);
        }
    })
}

//recuperer un utilisateur par email

Clients.findByEmail = (email,result) =>{

    let requet = "SELECT * FROM clients WHERE email_client = ?";

    connexion.query(requet, [email], (err, res)=>{
        if(err) {
            result(null, err);
        }
        else{  
            result(null, res);
        }
    })
}

//get client by ID
Clients.findById = (id_client,result) =>{
    let requet = "SELECT * FROM clients WHERE id_client = ?";
    connexion.query(requet, [id_client], (err, res)=>{
        if(err) {
            result(null, err);
        }
        else{ 
            result(null, res);
        }
    })
}

//trouver le client qui correspond a un code de validation
Clients.findByCodeValidation = (date_de_validation, code , result)=>{
    let sql = "UPDATE clients SET date_de_validation = ? WHERE code = ?";
    connexion.query(sql, [date_de_validation, code], (err, res)=>{
        if(err)
        {
            result(null, err);
        }
        else
        {
            result(null, res)
        }
    })
}

//Modification password
Clients.updatePassword = (nouveau_mdp, id_client, result)=>{
    let requet = "UPDATE clients SET mot_de_passe_client = ? WHERE id_client = ?";
    connexion.query(requet, [nouveau_mdp, id_client], (err, res)=>{
        if (err) 
            {
                result(null, err)
            }
            else{
                result(null, res)
            }
    })
}

//model liste tous les clients
Clients.findAllClient = (result) => {
    let requet = "SELECT * FROM clients";
    connexion.query(requet, (err, res)=>{
        if(err){
            console.log('err de selection')
            result(null, err)
        }
        else{
            result(null, res)
        }
    })
}
module.exports = Clients;