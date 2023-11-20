import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page connexion
export const UserController = (req, res) => {
    res.render("user", {base_url: baseUrl});
}