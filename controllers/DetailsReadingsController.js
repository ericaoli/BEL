import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

export const DetailsReadingsController = (req, res) => {
    let id = req.params.id;    
    console.log("id book.1 : " + id);
  
	// requete SQL qui va nous récupérer les informations
	let sql =
		`SELECT b.id_book, b.title, b.publication_year, b.description, b.isbn, b.url_cover_image, b.date_reading_club, b.alt_text,
                a.firstname, a.lastname, 
                e.name 
           FROM books b
                INNER JOIN author a ON b.id_author = a.id_author
                INNER JOIN editor e ON b.id_editor = e.id_editor
          WHERE b.id_book = ?`;
        
	pool.query(sql, [id], function (error, book) {
        res.render("details_readings", { base_url: baseUrl, books: book[0], user:req.session.user});
		
	});
};

export const CommentSubmit = (req, res) => {
    // déclaration des variables
    const comment = req.body.textarea;
    console.log(comment);
    let id = req.session.user.id_user;
    let idBook = req.session.book.id_book;
    console.log('User.1 qui envoie un commentaire:', req.session.user.firstname);

    let commentQuery = `INSERT INTO comment(date_added, comment, id_user, id_book) VALUES (CURDATE(), ?, ?, ?);`
    pool.query(commentQuery,[comment, id, idBook], (error, result) => {
        if(error) {
            console.error("Erreur requête SQL:", error);
        } else {
            res.render("details_readings", {
                message: "Votre commentaire a été bien enregistré!",
                base_url: baseUrl,
                comments: comment[0]
                });
            }
        })
    }