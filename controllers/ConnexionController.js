import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const ConnexionController = (req, res) => {
    res.render("connexion", {base_url: baseUrl});
}

//pour gérer le formulaire de connexion
// export const ConnexionSubmit = (req, res, next) => {
    
//     // Déclaration des variables
//     const email = req.body.email;
//     const password = req.body.password;
  

//     // 1. Vérifie si l'email est enregistré dans la base de données
//     const checkEmail = "SELECT * FROM users WHERE email = ?";
//     pool.query(checkEmail, [email], (checkErr, checkResult) => {
//         if(checkErr) {
//             console.error("Erreur requête SQL:", checkErr);
//             res.render("connexion", {
//                 message: "Erreur du serveur. Veuillez essayer plus tard.",
//                 base_url: baseUrl,
//                 });
//             }
//         // si l'email n'est pas enregistré
//         if(checkResult.length === 0){
//             console.log(checkResult);
//             res.render("connexion", {
//                 message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
//                 base_url: baseUrl,
//             });
//         } else {
//             const storedPassword = checkResult[0].password;
//             const userId = checkResult[0].id_user;

//             bcrypt.compare(password, storedPassword, (bcryptError, result) => {
//                 if(bcryptError) {
//                     console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
//                     res.render("connexion", {
//                         message: "Erreur. Veuillez ressayer.",
//                         base_url: baseUrl,
//                     })
//                 } else if(!result) {
//                     res.render("connexion", {
//                         message: "Login et/ou mot de passe incorrect.",
//                         base_url: baseUrl,
//                     });
//                 } else  {
//                     if(result) {
//                         const user = checkResult[0];
//                         if (!req.session.user) {
//                             req.session.user = user;
//                         }
//                     }
//                     if (req.res.user) {
//                         return res.redirect(`/user/${userId}`);
//                     }
//                     next();
//                 }
//             })
           
//             // console.log(checkResult);
//             // console.log("password saisi = " + password);
//             // console.log("password en base = " + storedPassword);
         
//         }
    

//     });//requete
// } // controller

// export const ConnexionSubmit = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     const checkEmail = "SELECT * FROM users WHERE email = ?";
//     pool.query(checkEmail, [email], (checkErr, checkResult) => {
//         if (checkErr) {
//             console.error("Erreur requête SQL:", checkErr);
//             return res.render("connexion", {
//                 message: "Erreur du serveur. Veuillez essayer plus tard.",
//                 base_url: baseUrl,
//             });
//         }

//         if (checkResult.length === 0) {
//             console.log(checkResult);
//             return res.render("connexion", {
//                 message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
//                 base_url: baseUrl,
//             });
//         }

//         const storedPassword = checkResult[0].password;
//         const userId = checkResult[0].id_user;

//         bcrypt.compare(password, storedPassword, (bcryptError, result) => {
//             if (bcryptError) {
//                 console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
//                 return res.render("connexion", {
//                     message: "Erreur. Veuillez ressayer.",
//                     base_url: baseUrl,
//                 });
//             }

//             if (!result) {
//                 return res.render("connexion", {
//                     message: "Login et/ou mot de passe incorrect.",
//                     base_url: baseUrl,
//                 });
//             }

//             if (result) {
//                 const user = checkResult[0];
//                 if (!req.session.user) {
//                     req.session.user = user;
//                 }
//             }

//             // if (req.res.user) {
//             //     return res.redirect(`/user/${userId}`);
//             // }

//             next();
//         });
//     });
// };

export const ConnexionSubmitPost = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const checkEmail = "SELECT * FROM users WHERE email = ?";
    pool.query(checkEmail, [email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            return res.render("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
            });
        }

        if (checkResult.length === 0) {
            console.log(checkResult);
            return res.render("connexion", {
                message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
                base_url: baseUrl,
            });
        }

        const storedPassword = checkResult[0].password;
        const userId = checkResult[0].id_user;

        bcrypt.compare(password, storedPassword, (bcryptError, result) => {
            if (bcryptError) {
                console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
                return res.render("connexion", {
                    message: "Erreur. Veuillez ressayer.",
                    base_url: baseUrl,
                });
            }

            if (!result) {
                return res.render("connexion", {
                    message: "Login et/ou mot de passe incorrect.",
                    base_url: baseUrl,
                });
            }

            if (result) {
                const user = checkResult[0];
                if (!req.session.user) {
                    req.session.user = user;
                }
            }

            // Chamar o próximo middleware
            next();
        });
    });
};

export const RedirectToUserPage = (req, res) => {
    const userId = req.session.user.id_user;

    // Redirecionar para a página do usuário
    return res.redirect(`/user/${userId}`);
};



