import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";
import { validationResult, body } from "express-validator";
import bodyParser from "body-parser";

const saltRoundsCrypt = 10;


// pour faire l'affichage de la page inscriptions
export const InscriptionController = (req,res) => {
		res.render("inscription", {base_url: baseUrl});
};

// pour traiter le formulaire d'inscription
export const InscriptionSubmit = (req,res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

//vérifie si l'utilisateur est déjà enregistré dans la base de données
  const checkUser = "SELECT * FROM users WHERE firstname = ? AND lastname = ? AND email = ?";
  pool.query(checkUser, [firstname, lastname, email], (checkErr, checkResult) => {
    // s'il y a une erreur, envoyer le message:
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
        bcrypt.hash(password, saltRoundsCrypt, function(err, hash) {
          const insertUserQuery = `INSERT INTO users (registration_date, firstname, lastname, email, password, id_user_type) VALUES (CURDATE(), ?, ?, ?, ?, 2)`;
          pool.query(insertUserQuery, [firstname, lastname, email, hash], (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Erreur requête SQL:", insertErr);
              res.render("inscription", {
              message: "Erreur du serveur. Veuillez essayer plus tard.",
              base_url: baseUrl,
              });
            } else {
              console.log(insertResult);
              res.render("inscription", {
              message: "Vous êtes inscrits au Club de lecture Brasil em livros!",
              base_url: baseUrl,
              });
            };
          });
        });
      };
    };
  });
};
 

  
    
 

