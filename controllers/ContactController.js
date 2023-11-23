import pool from "../config/database.js";
import { baseUrl } from "../server.js";

export const ContactController = (req, res) => {
    res.render("contact", {base_url: baseUrl});   
}

export const ContactSubmit = (req, res) => {

// déclaration des variables
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
// validation des champs du formulaire de contact
  try {
    if (!firstname || firstname.length < 3 || !/^[a-zA-Z]+$/.test(firstname)) {
      throw new Error (res.render("contact", {
        messageFirstname: "Le champ prénom est obligatoire. Veuillez utiliser au moins 3 lettres.",
        base_url: baseUrl}));
    }
    if (!lastname || lastname.length < 3 || !/^[a-zA-Z]+$/.test(lastname)) {
      throw new Error (res.render("contact", {
        messageLastname: "Le champ nom est obligatoire. Veuillez utiliser au moins 3 lettres.",
        base_url: baseUrl}));
    }
    if (!email || !email.match(emailRegex)) {
      throw new Error (res.render("contact", {
        messageEmail: "Le champ e-mail est obligatoire. Veuillez saisir une adresse valide.",
        base_url: baseUrl}));
    }
    if (!message) {
        throw new Error (res.render("contact", {
          messageUser: "Le champ message est obligatoire. Veuillez écrire votre message.",
          base_url: baseUrl}));
      }

   } catch (error) {
      console.error('Erreur de validation:', error.message);
      return res.status(400).render("contact", {
      message: error.message,
      base_url: baseUrl
      });
    }

    // Insérer le commentaire dans la base de données: formulaire public
        const insertMessage = "INSERT INTO message (firstname, lastname, email, message, registration_date) VALUES (?, ?, ?, ?, CURDATE())";
        pool.query(insertMessage, [firstname, lastname, email, message], (error, result) => {
            if (error) {
                console.error("Erreur requête SQL:", error);
                res.render("contact", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
                 });
            } else {
                console.log(result);
                res.render("contact", {
                message: "Merci de votre message!",
                base_url: baseUrl,
                });
            }
        })
} 




