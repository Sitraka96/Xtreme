/**
 * 
 * RAKOTOMALALA sitrakaniaina
 * 21-03-2023
 * entreprise d'accueil : A2MI
 * projet xtreme_tournoi
 * 
 */
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fileupload = require('express-fileupload');
// const hbs = require('nodemailer-express-handlebars');
const Clients = require('../model/Clients.model');
const config = require('../config/keys/keys')

const email_utiliser = '';
const password_utiliser = '';
var code = '';

//function pour creer le token pour ce souvenir du client connecter
function createToken(client)
{
    return jwt.sign({
        id: client.id_client,
        pseudo: client.pseudo_client
    }, config.secretKeys.Clients,{expiresIn: 86400})
}

//traitement d'un nouveau client dans le controller lors de l'inscription
exports.enregistrementNouveauClient = async(request, response) => {
    console.log(typeof request.body)
    console.log(Object.keys(request.body).length);
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        console.log("veuiller remplire les champs")
        response.status(500).json({message:"veuiller remplire les champs"})
    }
    else{
        await Clients.findByPseudo(request.body.pseudo_client, (err, result) =>
        {
            if(err)
                console.log('erreur lors de findByPseudo' + err)
            else
            {
                if(result.length > 0)
                    response.status(500).json({message: 'le pseudo: ' + request.body.pseudo_client + ' existe déjà'});
                else
                {
                    Clients.findByEmail(request.body.email_client, (err, result)=>
                    {
                        if(err)
                            console('erreur lors de findByEmail' + err)
                        else
                        {
                            if(result.length > 0)
                                response.status(500).json({message :"Quelqu'un utilise déjà l'email : "+ request.body.email_client});
                            else
                            {
                                const nouveau_client = new Clients(request.body);
                                if(request.body.constructor === Object && Object.keys(request.body).length === 0)
                                    response.status(500).json({error : true, message : "Erreur d'enregistrement compte utilisateur"});
                                else
                                {
                                    let date_de_creation_compte = new Date();
                                    let a_coder = date_de_creation_compte.toLocaleString();
                                    let mot_de_passe_client_hacher = crypto.createHash('sha3-512').update(request.body.mot_de_passe_client).digest('hex');
                                    code = crypto.createHash('sha3-512').update(a_coder).digest('hex');
                                    nouveau_client.date_de_creation = date_de_creation_compte;
                                    nouveau_client.mot_de_passe_client = mot_de_passe_client_hacher;
                                    nouveau_client.code = code;

                                    Clients.createClient(nouveau_client, (err, result)=>{
                                        if(err)
                                            response.status(400).json({message: "erreur d'enregistrement"})
                                        else
                                        {
                                            //envoye email en utilisant nodemailer
                                            // let transporter = nodemailer.createTransport({
                                            //     service: 'Gmail',
                                            //     auth: {
                                            //         type:'OAuth2',
                                            //         user: email_utiliser,
                                            //         pass: password_utiliser,
                                            //         clientId: "",
                                            //         clientSecret: "",
                                            //         refreshToken: "",
                                            //         accessToken:""
                                            //     }
                                            // });
                                            // let email_option ={
                                            //     from: email_utiliser,
                                            //     to: request.body.email_client,
                                            //     subject: 'Inscription Xtrem',
                                            //     html:
                                            //     `   <!DOCTYPE html>
                                            //             <html>
                                            //             <head>
                                            //                 <title>Confirmation de l'inscription</title>
                                            //                 <style type="text/css">
                                            //                     body {
                                            //                         margin: 0;
                                            //                         padding: 0;
                                            //                         font-family: Arial, sans-serif;
                                            //                     }
                                            //                     .container {
                                            //                         max-width: 600px;
                                            //                         margin: 0 auto;
                                            //                         padding: 20px;
                                            //                         box-sizing: border-box;
                                            //                         background-color: #f9f9f9;
                                            //                         border-radius: 10px;
                                            //                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                                            //                     }
                                            //                     h1 {
                                            //                         font-size: 24px;
                                            //                         margin-bottom: 20px;
                                            //                         text-align: center;
                                            //                     }
                                            //                     p {
                                            //                         font-size: 16px;
                                            //                         line-height: 1.5;
                                            //                         margin-bottom: 20px;
                                            //                         text-align: center;
                                            //                     }
                                            //                     a {
                                            //                         display: inline-block;
                                            //                         background-color: #008CBA;
                                            //                         color: white;
                                            //                         padding: 12px 28px;
                                            //                         text-align: center;
                                            //                         text-decoration: none;
                                            //                         font-size: 16px;
                                            //                         border-radius: 5px;
                                            //                         transition: background-color 0.2s ease;
                                            //                     }
                                            //                     a:hover {
                                            //                         background-color: #006699;
                                            //                     }
                                            //                 </style>
                                            //             </head>
                                            //             <body>
                                            //                 <div class="container">
                                            //                     <h1>Confirmation de l'inscription</h1>
                                            //                     <p>Merci de vous être inscrit. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
                                            //                     <form action="http://localhost:8080/valider" method="POST">
                                            //                         <input type="hidden" name="code" value="` + code + `">
                                            //                         <button type="submit">Activer mon compte</button>
                                            //                     </form>
                                            //                 </div>
                                            //             </body>
                                            //         </html>
                                                
                                            //     `
                                            // };
                                            // transporter.sendMail(email_option, (error, info) => {
                                            //     if (error) {
                                            //         console.log("l'erreur en cas non envoie du l'email => " + error);
                                            //     } else {
                                            //         console.log('email envoyé ' + info.response);
                                            //     }
                                            // });
                                            response.json({message: " inscription  avec succes ! verifier votre email pour la validation", data:result});
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            }
                
        })  
    }
};


//validation compte extreme
exports.validerCompte = async(req,res)=>{
    console.log('mba tung ato ve lou za eh');
    let date_validation = await new Date();
    Clients.findByCodeValidation(date_validation, req.body.code, (err, result)=>{
        if(err){
            res.status(400).json({message:"erreur de validation"});
        }
        else{
            console.log("verifeo anie le bdd fa ty ny params tao ho =>" + req.body.code)
            res.status(200).json({message:"votre compte est activer"});
        }
    })
} 


//function qui permet au utilisateur de se connecter
exports.clientsLogin = async(req, res)=>{
    await Clients.findByPseudo(req.body.pseudo_client, (err, result)=>{
        if(err)
            res.status(400).json({message: "erreur de connection: => ",err})
        else{
            let password_hash = crypto.createHash('sha3-512').update(req.body.mot_de_passe_client).digest('hex');
            result.map((client) =>{
                console.log(client);
            })
            if(result.length == 0)
            {
                console.log("Vous n'êtse pas encore enregistrer ou votre pseudo est incorrect");
                res.status(500).json({message: "Vous n'êtse pas encore enregistrer ou votre pseudo est incorrect"})
            }
            else
            {
                result.map(connecte=>{
                if(connecte.mot_de_passe_client !== password_hash)
                    {console.log("mot de pass incorrect")
                    res.status(500).json({message: "Mot de passe incorrecte"})}
                else
                {
                    req.session.clientId = connecte.id_client

                    console.log('ty lay session au moment anlay connexion' + req.session.clientId)
                    res.status(200).json({message: 'vous êtes connecter', data: req.session.clientId, token: createToken(connecte)});
                }

            })
            }
        }
    })   
}



//mise a jour mdp
exports.mettreAjoursMdpCtrl = async(req,res)=>{
    let old_password = crypto.createHash('sha3-512').update(req.body.encien_mdp).digest('hex');
    let new_password = crypto.createHash('sha3-512').update(req.body.nouveau_mdp).digest('hex');
    console.log(req.session.clientId)
    await Clients.findById(req.session.clientId, ( err,result)=>
    {
        if(err){
            res.status(400).json({message: 'erreur lors de la recuperation client pour updatepassword', error:err})
        }
        else
        {
            if(result.length == 0)
                res.status(500).json({message: 'Client introuvable =>', error:err})
            else
            {
                let now_password_bdd
                result.map((old) =>
                {
                    now_password_bdd = old.mot_de_passe_client 
                    if(old_password !==  now_password_bdd)
                        res.status(500).json({message: 'Ancien mot de passe incorrect'})
                    else
                    {
                        Clients.updatePassword(new_password, req.params.id_connecter, ( err,result)=>
                        {
                            if(err)
                                res.status(500).json({message: 'erreur de modification', error:err})
                            else
                            {
                                res.status(200).json({message : 'mot de passe a jour, vous pouvez utiliser le nouveau mdp pour vous connecter maintenant.'})
                            }
                        })
                    }
                } )

            }
        }
    })        
}

//deconnexion
exports.deconnexion = async(req, res) => 
{
    if (req.session && req.session.clientId) 
    {
        delete req.session.clientId
        res.status(200).json({message : 'deconnexion reussi'})

    } else 
    {
        res.status(500).json({message : 'impossible car personne n\'est connecter'})
    }
}

//lister tous les clients
exports.listeClients=(req,res)=>{
    Clients.findAllClient((err,result) => {
        if(err){
            res.status(400).json({message:'erreur de selection', error:err})
        }
        else{
            res.status(200).json({message:'selection reussi', clients:result})
        }
    })
}

//profil clients
exports.clientProfile = (req, res) => {
    console.log('session dans profile => ' + req.session.clientId)
    Clients.findById(req.session.clientId, ( err,result)=>{
        if(err){
            res.status(400).json({message: 'erreur de recuperation profil utilisateur', error:err})
        }
        else{
            res.status(200).json({message : 'suis bien connecter', client_connecter:result})
        }
    })
}