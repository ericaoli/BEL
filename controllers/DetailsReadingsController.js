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
    const message = req.body.textarea;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validation des champs du formulaire de commentaires
    try {
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
  
// vérifie si l'email est enregistré dans la base de données
    // const checkEmailUser = "SELECT * FROM users WHERE email = ?";

    // pool.query(checkEmailUser, [email], (checkErr, checkResult) => {
    //     if (checkErr) {
    //         console.error("Erreur requête SQL:", checkErr);
    //         return res.status(500).render("details_readings", {
    //             message: "Erreur du serveur. Veuillez essayer plus tard.",
    //             base_url: baseUrl,
    //         });
    //     }

    //     // Si l'email n'est pas enregistré
    //     if (checkResult.length === 0) {
    //         return res.status(404).render("details_readings", {
    //         message: "Vous n'êtes pas inscrit. Veuillez vous inscrire pour commenter un livre!",
    //         base_url: baseUrl,
    //         });
    //     }

    // })
}


