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

  //déclaration des variables
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // validation des champs du formulaire
  try {
    if (!firstname || firstname.length < 3 || !/^[a-zA-Z]+$/.test(firstname)) {
      throw new Error (res.render("inscription", {
        messageFirstname: "Champ obligatoire. Veuillez utiliser au moins 3 lettres.",
        base_url: baseUrl}));
    }
    if (!lastname || lastname.length < 3 || !/^[a-zA-Z]+$/.test(lastname)) {
      throw new Error (res.render("inscription", {
        messageLastname: "Champ obligatoire. Veuillez utiliser au moins 3 lettres.",
        base_url: baseUrl}));
    }
    if (!email || !emailRegex) {
      throw new Error (res.render("inscription", {
        message: "Champ obligatoire. L'addresse d'email n'est pas valide.",
        base_url: baseUrl}));
    }
    if (!password || password.length < 8 || password.length > 8) {
      throw new Error (res.render("inscription", {
        messagePassword: "Champ obligatoire. Veuillez utiliser 8 caractères.",
        base_url: baseUrl}));
    }

   } catch (error) {
      console.error('Erreur de validation:', error.message);
      res.status(400).send('Erreur de validation: ' + error.message);
    }

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
        //s'il y a un utilisateur enregistré avec les mêmes données prénom/nom/email, envoyer le message:
          res.render("inscription", {
          message: "Un utilisateur avec ces données est déjà enregistré.",
          base_url: baseUrl,
          });
      } else {
          // Vérifier si l'email existe déjà dans la base de données 
            const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
            pool.query(checkEmailQuery, [email], (checkEmailErr, checkEmailResult) => {
              if (checkEmailErr) {
              // En cas d'erreur lors de la vérification de l'email, afficher le message d'erreur
                console.error("Erreur de requête SQL pour vérifier l\'email :", checkEmailErr);
                res.render("inscription", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
             });
             } else {
                // Si l'email existe déjà, afficher un message correspondant
                  if (checkEmailResult.length > 0) {
                  res.render("inscription", {
                  messageEmailRegister: "Cet email est déjà enregistré.",
                  base_url: baseUrl,
                  });
              
                } else {
                  // Aucun utilisateur a les mêmes données, l'inscription peut poursuivre
                  bcrypt.hash(password, saltRoundsCrypt, function(err, hash) {
                    const insertUserQuery = "INSERT INTO users (registration_date, firstname, lastname, email, password, id_user_type) VALUES (CURDATE(), ?, ?, ?, ?, 2)";
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
                      }; // fin confirme inscription
                    }); // fin requete insert
                  }); //fin bcrypt
                } // fin l'inscription poursuit après la verification de l'email
              }
            }) // fin poolquery checkEmail
          }; // fin else - l'inscription poursuivre avec la verificaçao de l'ensemble
        }; // fin if erreur checkUser
      }); // fin poolquery checkUser
    }; // fin controller
 

  
    
 

