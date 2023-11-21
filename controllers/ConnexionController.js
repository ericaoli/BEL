import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const ConnexionController = (req, res) => {
    res.render("connexion", {base_url: baseUrl});
}

//pour gérer la connexion de l'utilisateur
// export const ConnexionSubmitUser = (req, res, next) => {
    
//     // Déclaration des variables
//     const email = req.body.email;
//     //console.log(`email: ${email}`);
//     const password = req.body.password;
//     //console.log(`password: ${password}`);

//     let id = req.params.id;

//     // 1. Vérifie si l'email est enregistré dans la base de données
//     const checkEmailUser = "SELECT * FROM users WHERE email = ?";
   
//     pool.query(checkEmailUser, [email], (checkErr, user, checkResult) => {
//         console.log(user);
//         if(checkErr) {
//             console.error("Erreur requête SQL:", checkErr);
//             return res.status(500).render("connexion", {
//                 message: "Erreur du serveur. Veuillez essayer plus tard.",
//                 base_url: baseUrl, users: user,
//                 });
//             }
//         // si l'email n'est pas enregistré
//         if(checkResult.length === 0){
//             return res.status(404).render("connexion", {
//                 message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
//                 base_url: baseUrl, users: user,
//             });
//         } else {
//             // vérification du mot de passe bcrypté
//             bcrypt.compare(password, user[0].password, (bcryptError, result) => {
//                 if(bcryptError) {
//                     console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
//                     res.render("connexion", {
//                         message: "Erreur. Veuillez ressayer.",
//                         base_url: baseUrl, users: user,
//                     })
//                 } else if(!result) {
//                     // si le mot de passe est incorrect, envoie un message
//                     res.status(401).render("connexion", {
//                         message: "Login et/ou mot de passe incorrect.",
//                         base_url: baseUrl, users: user,
//                     });
//                 } else {
//                     // si le mot de passe est correct
//                     if(result) {
//                         // si la session n'existe pas, on crée la session pour l'admin
//                         if (!req.session.user) {
//                             req.session.user = user;
//                             console.log(`user session: ${req.session.user}`);
//                         }
//                     }   // si la session existe, rediriger vers la page admin
//                         if(req.session.user) {
//                             return res.redirect("/user", { base_url: baseUrl, users: user[0]});
//                     }   else {
//                             next();
//                     }   
//                 }
//             });
//         }
//     });//requete
// } // controller

export const ConnexionSubmitUser = (req, res, next) => {
    
    // Déclaration des variables
    const email = req.body.email;
    //console.log(`email: ${email}`);
    const password = req.body.password;
    //console.log(`password: ${password}`);

    let id = req.params.id;

    // 1. Vérifie si l'email est enregistré dans la base de données
    const checkEmailUser = "SELECT * FROM users WHERE email = ?";
   
    pool.query(checkEmailUser, [email], (checkErr, user, checkResult) => {
        console.log(user);
        if(checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            return res.status(500).render("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl, users: user,
                });
            }
        // si l'email n'est pas enregistré
        if(checkResult.length === 0){
            return res.status(404).render("connexion", {
                message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
                base_url: baseUrl, users: user,
            });
        } else {
            // vérification du mot de passe bcrypté
            bcrypt.compare(password, user[0].password, (bcryptError, result) => {
                if(bcryptError) {
                    console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
                    res.render("connexion", {
                        message: "Erreur. Veuillez ressayer.",
                        base_url: baseUrl, users: user,
                    })
                } else if(!result) {
                    // si le mot de passe est incorrect, envoie un message
                    res.status(401).render("connexion", {
                        message: "Login et/ou mot de passe incorrect.",
                        base_url: baseUrl, users: user,
                    });
                } else {
                    // si le mot de passe est correct
                    if(result) {
                        // si la session n'existe pas, on crée la session pour l'admin
                        if (!req.session.user) {
                            req.session.user = user;
                            console.log(`user session: ${req.session.user}`);
                        }
                    }   // si la session existe, rediriger vers la page admin
                        if(req.session.user) {
                            return res.redirect("/user", { base_url: baseUrl, users: user[0]});
                    }   else {
                            next();
                    }   
                }
            });
        }
    });//requete
} // controller