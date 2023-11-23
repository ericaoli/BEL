import pool from "../config/database.js";
import { baseUrl } from "../server.js";
import multer from "multer";


// pour faire l'affichage de la page connexion
export const AdminController = (req, res) => {
    res.render("admin",{ admin: req.session.admin, base_url: baseUrl });
}

export const AddBooks = async (req, res) => {

    // fait upload de l'image vers le dossier images
    // if (req.file) {
    // 	console.log("Fichier téléchargé avec succès : " + req.file.filename);
    // } else {
    // 	console.log("Aucun fichier sélectionné.");
    // }

    // déclaration de variables
    const title = req.body.title;
    // const publicationYear = req.body.parution;
    // const description = req.body.description;
    // const isbn = req.body.ISBN;
    // const urlCoverImage = req.body.url_cover_image;
    // const altText = req.body.alt_text;
    // const dateReadingClub = req.body.date_reading_club;
    const idBookCategory = req.body.id_book_category;
    const editor = req.body.editor;
    const author = req.body.author;


  pool.query('CALL INSERT_BOOK', [author, editor, idBookCategory, title], (error, result) => {
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

