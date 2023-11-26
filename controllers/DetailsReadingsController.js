import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";


export const DetailsReadingsController = (req, res) => {
    let id = req.params.id;
  
	// requete SQL qui va nous récupérer les informations
	let sql =
		`SELECT b.id_book, b.title, b.publication_year, b.description, b.isbn, b.url_cover_image, b.date_reading_club, b.alt_text,
                a.firstname, a.lastname, 
                e.name 
           FROM books b
                INNER JOIN author a ON b.id_author = a.id_author
                INNER JOIN editor e ON b.id_editor = e.id_editor
          WHERE b.id_book = ?`;
        
	pool.query(sql, [id], function (error, book, fields) {
		res.render("details_readings", { base_url: baseUrl, books: book[0]});
        //console.log(book[0]);
	});
};


export const CommentSubmit = (req, res) => {

    // déclaration des variables
    const email = req.body.email;
    //console.log(email);
    const comment = req.body.textarea;
    //console.log(comment);
    let id = req.params.id;

    // 1. Vérifie si l'email est enregistré dans la base de données
    const checkEmailUser = "SELECT id_user, registration_date, lastname, firstname, email, password, id_user_type FROM users WHERE email = ? AND id_user_type = 2";
    pool.query(checkEmailUser, [id, email], (checkErr, user, checkResult) => {
        console.log('User qui envoie un commentaire:', user);
        if (checkErr) {
            console.error("Erreur requête SQL:", checkErr);
            return res.status(500).render("connexion", {
                message: "Erreur du serveur. Veuillez essayer plus tard.",
                base_url: baseUrl,
                users: user,
            });
        }
        // Si l'email n'est pas enregistré
        if (checkResult.length === 0) {
            return res.status(404).render("connexion", {
                message: "Vous n'êtes pas inscrit. Veuillez vous inscrire!",
                base_url: baseUrl,
                users: user,
            });
        }
        // si l'email est enregistré
        if (checkResult.length > 0) {
            let commentQuery = `INSERT INTO comment(date_added, comment, id_user, id_book) VALUES (CURDATE(), ?, ?, ?);`
            pool.query(commentQuery,[comment, id], (error, result) => {
                if(error) {
                    console.error("Erreur requête SQL:", insertErr);
                } else {
                    res.render("details_readings", {
                        message: "Votre commentaire a été bien enregistré!",
                        base_url: baseUrl,
                        comments: comment[0]
                        });
                }

            })
        }
    });

}


