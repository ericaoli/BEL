import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const ContactController = (req, res) => {
    res.render("contact", {base_url: baseUrl});
    const insertMessage = "INSERT INTO message (firstname, lastname, email, message, registration_date, id_user) VALUES (?, ?, ?, ?, CURDATE(), ?)";
    pool.query(insertMessage, [firstname, lastname, email, message, registration_date, id_user]), (insertErr, insertResult) => {
        if (insertErr) {
            console.error("Erreur requête SQL:", insertErr);
            res.render("inscription", {
            message: "Erreur du serveur. Veuillez essayer plus tard.",
            base_url: baseUrl,
            });
          } else {
            console.log(insertResult);
            res.render("inscription", {
            message: "Merci de votre message!",
            base_url: baseUrl,
            });
        }
    }
}

export default ContactController;