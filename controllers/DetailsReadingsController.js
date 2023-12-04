import pool from "../config/database.js";
import { baseUrl } from "../server.js";

export const DetailsReadingsController = (req, res) => {       
    let id = req.params.id; 
    //console.log("id book.1 : " + id);
	
    // requête SQL qui récupére les informations du livre sélectionné
	let sql =
		`SELECT b.id_book, b.title, b.publication_year, b.description, b.isbn, b.url_cover_image, b.date_reading_club, b.alt_text,
                a.firstname, a.lastname, 
                e.name 
                FROM books b
                    INNER JOIN author a ON b.id_author = a.id_author
                    INNER JOIN editor e ON b.id_editor = e.id_editor
                WHERE b.id_book = ?`;

	pool.query(sql, [id], function (error, book, fields) {
        // requête SQL qui récupére les commentaires du livre sélectionné
        let sqlCommentList =
                    `SELECT c.id_comment, c.date_added, c.comment,  
                            u.firstname, u.lastname
                        FROM 
                            comment c
                        LEFT JOIN 
                            users u ON c.id_user = u.id_user 
                        WHERE c.id_book = ?`;
         
        let commentSaisi = req.body.text;
        let comment = "";
        //console.log(`Champ commentaire: ${comment}`);

        if (req.body.text !== undefined) {
            comment = req.body.text;
        } else {
            comment = "Aucun commentaire saisi.";
        }

        pool.query(sqlCommentList, [id], function(error, comment, field) {
            if(error) {
                console.error("Erreur requête SQL:", error);
                return res.status(500).send("Erreur du serveur. Veuillez essayer plus tard.");
            } 
            //s'il y a un livre, afiche les informations du livre et ses respectifs commentaires 
            if(book.length > 0) {
                
                res.render("details_readings", { 
                    base_url: baseUrl, 
                    books: book,
                    comments: comment,  
                    user:req.session.user });
		            //console.log(`Résultat de la requête:`, book, comment);            
            }
                let idUser = (req.session.user && req.session.user.id_user) || null; // ID user, admin et null pour les non enregistrés
                //console.log(`comment = ` + commentSaisi);
                //console.log(`idUser = ` + idUser);
                //console.log(`idBook = ` + id);

                // s'il y a un commentaire sur ce livre, requête pour l'insérer dans la table commentaire
                if (req.body.text !== undefined) {
                     //comment = req.body.text;
                     let commentQuery = `INSERT INTO comment(date_added, comment, id_user, id_book) VALUES (CURDATE(), ?, ?, ?)`
                     pool.query(commentQuery,[commentSaisi, idUser, id], (error, result) => {
                         if(error) {
                             console.error("Erreur requête SQL:", error);
                             return res.status(500).send("Erreur du serveur. Veuillez essayer plus tard.");
                         } else {
                             console.log(`Commentaire envoyé`);

                         }
                     })

                 } else {
                    comment = "Aucun commentaire saisi.";
                 }

        });
	});
};


export const LikeReadings = (req, res) => {
    let id = req.params.id;
    console.log(`idBook likereadings = ${id}`);

    let idUser = req.session.user && req.session.user.id_user;
    console.log(`idUser likereadings = ${idUser}`);

    let sqlInsertLiked = `INSERT INTO liked(id_book, id_user) VALUES(?, ?)`;

    pool.query(sqlInsertLiked, [id, idUser], (error, result) => {
        if (error) {
            console.error("Erreur requête SQL:", error);
            return res.status(500).send("Erreur du serveur. Veuillez essayer plus tard.");
        } else {
            console.log(`Le livre ${id} est dans ma bibliothèque de favoris!`);
            res.redirect(`/details_readings/${id}`);
        }
    });
};

