import pool from "../config/database.js";
import { baseUrl } from "../server.js";

export const ContactController = (req, res) => {
    res.render("contact", {base_url: baseUrl, user:req.session.user});   
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

    // Insérer le commentaire dans la base de données
    let insertMessage = "INSERT INTO message (firstname, lastname, email, message, registration_date, id_user) VALUES (?, ?, ?, ?, CURDATE(), ?)";
       
    // la variable id reçoit la valeur en fonction de la présence ou de l'absence de req.session.user ou req.session.admin
    let id = req.session.user ? req.session.admin : null;

    pool.query(insertMessage, [firstname, lastname, email, message, id], (error, result) => {
    //console.log(`user form contact ${id}`);
      if (error) {
        console.error("Erreur requête SQL:", error);
        res.render("contact", {
          message: "Erreur du serveur. Veuillez essayer plus tard.",
          base_url: baseUrl,
        });
      }
      // si le résultat est bon et la session user existe 
      if (result && req.session.user) {
      //console.log(result);
        console.log(`CONTACT USER RéUSSI`);
        res.render("contact", {
          message: `${req.session.user.firstname}, votre message a été envoyé. Merci!`,
          base_url: baseUrl,
        });
      // si le résultat est bon et la session admin existe
      } else if (result && req.session.admin){
        console.log(`CONTACT ADMIN RéUSSI`);
        res.render("contact", {
          message: `${req.session.admin.firstname}, votre message a été envoyé. Merci!`,
          base_url: baseUrl,
        });
      } else {
        console.log(`CONTACT PUBLIC RéUSSI`);
      // sinon le résultat est bon et la session n'existe pas
        res.render("contact", {
        message: `${firstname}, votre message a été envoyé. Merci!`,
        base_url: baseUrl,
        });
      } 
    });
  } 