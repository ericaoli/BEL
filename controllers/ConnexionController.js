import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const ConnexionController = (req, res) => {
    res.render("connexion", {base_url: baseUrl});
}

export default ConnexionController;