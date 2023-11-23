import { date } from "yup";
import pool from "../config/database.js";
import { baseUrl } from "../server.js";
import multer from "multer";


// pour faire l'affichage de la page admin avec la session
export const AdminController = (req, res) => {
    res.render("admin",{ admin: req.session.admin, base_url: baseUrl});				 
}

// export const helloAdmin = (req, res) => {
//     let id = req.params.id;
// 	// requete SQL qui récupére l'admin
// 	let sqlAdmin = `SELECT wording FROM user_type WHERE id_user_type = 1`;
// 	pool.query(sqlAdmin, [id], (err, res) => {
//     res.render("admin",{ admin: req.session.admin, base_url: baseUrl, user_type: user});
//     })
// }
						
	



export const AddBooks = async (req, res) => {


    // déclaration de variables
    const title = req.body.title;
    const publicationYear = req.body.parution;
    const description = req.body.description;
    const isbn = req.body.ISBN;
    const urlCoverImage = req.body.url_cover_image;
    const altText = req.body.alt_text;
    const dateReadingClub = req.body.date_reading_club;
    const idBookCategory = req.body.id_book_category;
    const editor = req.body.editor;
    const authorFistname = req.body.author_firstname;
    const authorLastname = req.body.author_lastname;

    // fait upload de l'image vers le dossier images
    if (req.file) {
    	console.log("Fichier téléchargé avec succès : " + req.file.filename);
    } else {
    	console.log("Aucun fichier sélectionné.");
    }


    const createProcedureSql = `CALL INSERT_BOOK(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    pool.query(createProcedureSql, [title, publicationYear, description, isbn, urlCoverImage, altText, dateReadingClub, idBookCategory, editor, authorFistname, authorLastname], (error, result) => {
    if (error) {
        console.error("Erreur requête SQL:", error);
        res.render("admin", {
        message: "Erreur du serveur. Veuillez essayer plus tard.",
        base_url: baseUrl,
        });
      } else {
        console.log(result);
        res.render("admin", {
        message: "Le livre a été bien enregistré.",
        base_url: baseUrl,
        });
      }; 
  })
                    
}

