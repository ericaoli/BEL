import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const ConnexionController = (req, res) => {
    res.render("connexion", {base_url: baseUrl});
}

// pour gérer le formulaire de connexion
export const ConnexionSubmit = (req, res) => {

    //déclaration des variables
    const email = req.body.email;
    const password = req.body.password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    //1. validation des champs du formulaire
    try {
        if (!email || !email.match(emailRegex)) {
          throw new Error (res.render("connexion", {
            message: "Le champ e-mail est obligatoire. Veuillez saisir une adresse valide.",
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

    //2. vérifie si l'utilisateur n'est pas encore enregistré dans la base de données
    const checkEmail = "SELECT * FROM users WHERE email = ?";
    pool.query(checkEmail, [email], (checkErr, checkResult) => {
    // s'il y a une erreur, envoyer le message:
        if(checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            res.render ("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl, 
            });
        }else {
            if (checkResult.length === 0) {
                //si l'utilisateur n'est pas enregistré, il voit le message:
                res.render("connexion", {
                    message: "Vous n'êtes pas inscrite. Veuillez vous inscrire!",
                    base_url: baseUrl,
                });
            }else {
                //3. Vérifier si le mot de passe correspond à l'email
                const checkConnexion = "SELECT password FROM users WHERE email = ?";
                pool.query(checkConnexion, [email], (checkConnexionErr, checkConnexionResult) => {
                if (checkConnexionErr) {
                    // En cas d'erreur lors de la vérification de l'email, afficher le message d'erreur
                    console.error("Erreur de requête SQL pour vérifier l\'email et le mot de passe :", checkConnexionErr);
                    res.render("connexion", {
                        message: "Erreur du serveur. Veuillez essayer plus tard.",
                        base_url: baseUrl,
                    });
                }else {
                        // Si l'email et le respectif mot de passe existent, afficher un message correspondant
                        if (checkConnexionResult.length > 0) {
                            const storedPassword = checkConnexionResult[0].password;
                            bcrypt.compare(password, storedPassword, (bcryptError, result) => {
                                if (bcryptError) {
                                    console.error('Erreur pendant la comparaison des mots de passe:', bcryptError);
                                    res.render("connexion", {
                                        message: "Erreur. Veuillez ressayer.",
                                        base_url: baseUrl,
                                    });
                                
                                }else {
                                    if(result) {
                                    // si le mot de passe est bon
                                        res.render("connexion", {
                                            message: "Vous êtes connecté.",
                                            base_url: baseUrl,
                                });
                                    }else {
                                        // mot de passe incorrecte
                                        res.render("connexion", {
                                            message: "Informations invalides. Veuillez ressayer.",
                                            base_url: baseUrl,
                                        });
                                    }
                                }
                            });
                        } 
                    }

                }); 
            }
        }
    }); // fin check email
}; // fin connexion submit
        