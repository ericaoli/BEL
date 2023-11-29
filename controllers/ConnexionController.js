import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";

// pour faire l'affichage de la page connexion
export const ConnexionController = (req, res) => {
    res.render("connexion", {base_url: baseUrl});
}
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

export const Logout = (req, res) => {
	req.session.destroy((err) => {
		res.redirect("/");
	});
};
export const ConnexionSubmitUser = (req, res, next) => {

    // Déclaration des variables
    const email = req.body.email;
    //console.log(email);
    const password = req.body.password;
    //console.log(password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  //1. Validation des champs du formulaire de connexion
  try {
    if (!email || !email.match(emailRegex)) {
      throw new Error (res.render("connexion", {
        messageEmail: "Le champ e-mail est obligatoire. Veuillez saisir une adresse valide.",
        base_url: baseUrl}));
    }
    if (!password || password.length !== 8) {
      throw new Error (res.render("connexion", {
        messagePassword: "Le champ mot de passe est obligatoire. Veuillez saisir 8 caractères.",
        base_url: baseUrl}));
    }
   } catch (error) {
      console.error('Erreur de validation:', error.message);
      return res.status(400).render("connexion", {
      message: error.message,
      base_url: baseUrl
      });
    }
    
    // 2. Vérifie si l'email est enregistré dans la base de données
    const checkEmailUser = "SELECT id_user, registration_date, lastname, firstname, email, password, id_user_type FROM users WHERE email = ?";

    pool.query(checkEmailUser, [email], (checkErr, user) => {
        console.log('Contenu user:', user);
        if (checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            return res.status(500).render("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
            });
        }
        // Si l'email n'est pas enregistré
        if (user.length === 0) {
            return res.status(404).render("connexion", {
                message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
                base_url: baseUrl,
            });
        }

        // 3. Vérifie si le mot de passe saisi est correct
        const storedPassword = user[0].password;
        const admin = { id_user_type: 1, firstname: "Chico" };

        bcrypt.compare(password, storedPassword, (bcryptError, result) => {
            // s'il y a une erreur
            if (bcryptError) {
                console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
                return res.render("connexion", {
                    message: "Erreur. Veuillez ressayer.",
                    base_url: baseUrl,
                });
            }
            // Si le mot de passe est incorrect, envoie un message
            if (!result) {
                return res.status(401).render("connexion", {
                    message: "Login et/ou mot de passe incorrect.",
                    base_url: baseUrl,
                });
            } else {
                // Si le mot de passe est correct, si le user est du type user et si la session n'existe pas, on crée la session user et redirige vers la page user
                if (user[0].id_user_type === 2 && !req.session.user) {
                req.session.user = user[0];
                console.log(`Nouvelle session créée pour l'utilisateur: ${req.session.user.firstname}`);
                // Rediriger vers la page utilisateur
                return res.redirect("/user");
            }
                // Si le mot de passe est correct, si le user est du type admin et si la session n'existe pas, on crée la session admin et redirige vers la page admin
                else if (user[0].id_user_type === 1 && !req.session.admin) {
                req.session.admin = admin;
                console.log(`Nouvelle session créée pour l'administrateur: ${req.session.admin.firstname}`);
                return res.redirect("/admin");
                }
            } 
            // Si aucune condition n'est satisfaite, passe à la suite
            next();
        });
    });
}; 
