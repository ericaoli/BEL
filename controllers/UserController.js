
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const UserController = (req, res) => {
    res.render("user", { user: req.session.user, base_url: baseUrl, users: user[0]});
}