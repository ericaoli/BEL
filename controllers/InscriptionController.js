import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";
import * as yup from "yup";

const saltRoundsCrypt = 10;

export const InscriptionController = (req,res) => {
		res.render("inscription", {base_url: baseUrl});
};


export const InscriptionSubmit = (req,res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

  // validation du formulaire
  let erreurs = [];

  if(!firstname || typeof firstname == undefined || firstname == null){
    erreurs.push = ({message: "Prènom invalide"})
  }
  if(!lastname || typeof lastname == undefined || lastname == null){
    erreurs.push = ({message: "Nom invalide"})
  }
  if(!email || typeof email == undefined || email == null){
    erreurs.push = ({message: "email invalide"})
  }
  if (password.length !== 8){
    erreurs.push = ({message: "mot de passe invalide"})
  }

  if(erreurs.length > 0) {
    res.render ("inscription", {erreurs: erreurs, base_url: baseUrl})
  } else {


    
    // vérifie si l'utilisateur est déjà enregistré dans la base de données
    const checkUser = "SELECT * FROM users WHERE firstname = ? AND lastname = ? AND email = ?";

    pool.query(checkUser, [firstname, lastname, email], (checkErr, checkResult) => {
        if(checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            res.render ("inscription", {
               message: "Erreur du serveur. Veuillez essayer plus tard.",
               base_url: baseUrl, 
            });
        } else {
            if (checkResult.length > 0) {
            //s'il y a un utilisateur enregistré avec les mêmes données, envoyer le message:
            res.render("inscription", {
            message: "Un utilisateur avec ces données est déjà enregistré.",
            base_url: baseUrl,
          });
        } else {
        // Aucun utilisateur a les mêmes données, l'inscription peut poursuivre
        bcrypt.hash(req.body.password, saltRoundsCrypt, function(err, hash) {
            const insertUserQuery = `INSERT INTO users (registration_date, firstname, lastname, email, password, id_user_type) VALUES (CURDATE(), ?, ?, ?, ?, 2)`;
  
            pool.query(insertUserQuery, [firstname, lastname, email, hash], (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Erreur requête SQL:", insertErr);
                res.render("inscription", {
                  messageError: "Erreur du serveur. Veuillez essayer plus tard.",
                  base_url: baseUrl,
                });
              } else {
                console.log(insertResult);
                res.render("inscription", {
                  messageRegister: "Vous êtes inscrits au Club de lecture Brasil em livros!",
                  base_url: baseUrl,
                });
              };
            });
          });
        };
        };
    });
  }
 
}; 
  
    
 

