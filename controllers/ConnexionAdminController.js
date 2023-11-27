import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";

// pour faire l'affichage de la page connexion
export const ConnexionAdminController = (req, res) => {
    res.render("connexion_admin", {base_url: baseUrl});
}

//pour gérer la connexion de l'admin
export const ConnexionSubmitAdmin = (req, res, next) => {
    
    // Déclaration des variables
    const email = req.body.email;
    console.log(`email: ${email}`);
    const password = req.body.password;
    console.log(`password: ${password}`);
    const admin = {
        id_user_type: 1,  
    };

    // 1. Vérifie si l'email est enregistré dans la base de données
    const checkEmailAdmin = "SELECT * FROM users WHERE email = ? AND id_user_type = 1";

    pool.query(checkEmailAdmin, [email], (checkErr, checkResult) => {
        if(checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            res.status(500).render("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
                });
            }
        // si l'email n'est pas enregistré
        if(checkResult.length === 0){
            res.status(404).render("connexion_admin", {
                message: "Accès non autorisé.",
                base_url: baseUrl,
            });
        } else {
            // vérification du mot de passe bcrypté
            const storedPassword = checkResult[0].password;
            bcrypt.compare(password, storedPassword, (bcryptError, result) => {
                if(bcryptError) {
                    console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
                    res.render("connexion", {
                        message: "Erreur. Veuillez ressayer.",
                        base_url: baseUrl,
                    })
                } else if(!result) {
                    // si le mot de passe est incorrect, envoie un message
                    res.status(401).render("connexion", {
                        message: "Login et/ou mot de passe incorrect.",
                        base_url: baseUrl,
                    });
                } else {
                    // si le mot de passe est correct
                    if(result) {
                        // si la session n'existe pas, on crée la session pour l'admin
                        if (!req.session.admin) {
                            req.session.admin = admin;
                            console.log(`session adm: ${admin}`);
                        }
                    }   // si la session existe, rediriger vers la page admin
                        if(req.session.admin) {
                            return res.redirect("/admin");
                    }    
                      next();
                }
            });
        }
    });//requete
} // controller


