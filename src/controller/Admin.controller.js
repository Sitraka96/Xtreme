const Admin = require('../model/Admin.model');

//function qui permet au utilisateur de se connecter
exports.adminLogin = async (req, res)=>{
    if(!req.session.Admin)
    {
        await Admin.findOneByEmailAdmin(req.body.email_admin, (err,result) =>{
            if(err)
                res.status(400).json({message : 'Admin introuvable'})
            else{
                if(result.length == 0)
                    res.status(400).json({message : "Votre email n'est pas autoriser pour l'Administration du site'"})
                else
                {
                    result.map(admin =>{
                        console.log(admin)
                        if(admin.password_admin !== req.body.password_admin)
                            res.status(400).json({message : "Mot de passe incorrecte"})
                        else{
                            req.session.Admin = admin.id_admin
                            console.log(req.session.Admin)
                            res.status(200).json({message:"vous êtes connecter en tant qu'admin", admin:req.session.Admin})
                        }
                    })
                }
            }
        })
    }
    else
        res.redirect('/clients')
}
//deconnexion admin
exports.deconnexionAdmin = async(req, res) => 
{
    if (req.session && req.session.Admin) 
    {
        console.log(req.session.Admin)
        await delete req.session.Admin
        res.status(404).json({message : 'deconnexion Admin'})

    } else 
    {
        res.status(404).json({message : 'impossible car personne n\'est connecter'})
    }
}