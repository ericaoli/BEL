
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const UserController = (req, res) => {
    console.log("User in UserController:", req.session.user);
    res.render("user", { user: req.session.user, base_url: baseUrl });
}