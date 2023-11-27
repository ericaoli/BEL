import pool from "../config/database.js";
import { baseUrl } from "../server.js";

// pour faire l'affichage de la page connexion
export const UserController = (req, res) => {  
    console.log(`Le user en session est : ${req.session.user.firstname}`);
      
    res.render("user", { user: req.session.user, base_url: baseUrl });
}





