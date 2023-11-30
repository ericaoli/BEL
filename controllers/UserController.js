import pool from "../config/database.js";
import { baseUrl } from "../server.js";


// Function pour obtenir les livres aimés par l'user
const getUserLibrary = (idUser, callback) => {
    console.log("Entréé dans getUserLibrary");
    let sqlUserLiked = `SELECT DISTINCT l.id_user,
                               b.id_book, b.title, b.alt_text, b.url_cover_image
                        FROM books b
                        LEFT JOIN liked l ON b.id_book = l.id_book
                        WHERE l.id_user = ?`;

    pool.query(sqlUserLiked, [idUser], (error, result) => {
        console.log("Query result:", result);
        if (error) {
            console.error("Erreur requête SQL:", error);
            callback(error, null);
        } else {
            console.log("Query réussie");
            callback(null, result);
        }
    });
};

// Function principale pour afficher la page user
export const UserController = (req, res) => {
    console.log("Entréé dans userController");

    let idUser = req.session.user && req.session.user.id_user;
    console.log("C'est la page de l'utilisateur à = " + idUser);

    // Appel de la fonction qui récupère les livres aimés
    getUserLibrary(idUser, (error, userLibrary) => {
        console.log("Entréé dans getUserLibrary");
        if (error) {
            return res.status(500).send("Erreur du serveur. Veuillez essayer plus tard.");
        }

        // Affichage de la page avec les livres aimés par l'user
        res.render("user", {
            base_url: baseUrl,
            userLibrary: userLibrary,
            user: req.session.user
        });
    });
};



