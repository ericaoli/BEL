
import pool from "../config/database.js";
import { baseUrl } from "../server.js";


// pour faire l'affichage de la page admin avec la session
export const AdminController = (req, res) => {
    res.render("admin",{ admin: req.session.admin, base_url: baseUrl});				 
}


export const AddBooks = async (req, res) => {
    // déclaration de variables
    const title = req.body.title;
    const publicationYear = req.body.parution;
    const description = req.body.description;
    const isbn = req.body.ISBN;
    const urlCoverImage = req.file.filename;
    const altText = req.body.alt_text;
    const dateReadingClub = req.body.date_reading_club;
    const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    const idBookCategory = req.body.id_book_category;
    const editor = req.body.editor;
    const authorFistname = req.body.author_firstname;
    const authorLastname = req.body.author_lastname;
   
    // validation des champs du formulaire
    try {
      
      if (!title || title.length > 250) {
        throw new Error (res.render("admin", {
          messageTitle: "Le champ 'Titre' est obligatoire. Taille maximale : 250 caractères.",
          base_url: baseUrl}));
      }
      if (!publicationYear || publicationYear.length !== 4 || isNaN(publicationYear)) {
        throw new Error (res.render("admin", {
          messagePublicationYear: "Le champ 'Année de parution' est obligatoire. Veuillez saisir 4 chiffres.",
          base_url: baseUrl}));
      }
      if (!description || description.length > 4000) {
        throw new Error (res.render("admin", {
          messageDescription: "Le champ 'Description' est obligatoire. Taille maximale : 4000 caractères.",
          base_url: baseUrl}));
      }
      if (!isbn || isbn.length !== 13 || isNaN(isbn)) {
        throw new Error (res.render("admin", {
          messageIsbn: "Le champ 'ISBN' est obligatoire. Veuillez saisir 13 chiffres.",
          base_url: baseUrl}));
      }
      if (!urlCoverImage) {
        throw new Error (res.render("admin", {
          messageImage: "Champ obligatoire. Veuillez choisir l'image de couverture du livre.",
          base_url: baseUrl}));
      }
      if (!dateReadingClub) {
        throw new Error (res.render("admin", {
          messageDateReading: "Le champ 'Date de lecture au club' est obligatoire et doit être au format jj/mm/aaaa.",
          base_url: baseUrl}));
      }
      if (!idBookCategory || (idBookCategory !== '1' && idBookCategory !== '2')) {
        throw new Error (res.render("admin", {
          messageIdBookCategory: "Le champ 'Categorie du livre' est obligatoire. Saisissez 1 pour classic ou 2 pour contemporain.",
          base_url: baseUrl}));
      }
      if (!editor || !/^[a-zA-Z]+$/.test(editor)) {
        throw new Error (res.render("admin", {
          messageEditor: "Le champ 'Editeur' est obligatoire. Saisissez un nom valid.",
          base_url: baseUrl}));
      }
      if (!authorFistname || !/^[a-zA-Z]+$/.test(authorFistname)) {
        throw new Error (res.render("admin", {
          messageAuthorFirstname: "Le champ 'Auteur - Prénom' est obligatoire. Saisissez un nom valid.",
          base_url: baseUrl}));
      }
      if (!authorLastname || !/^[a-zA-Z]+$/.test(authorLastname)) {
        throw new Error (res.render("admin", {
          messageAuthorLastname: "Le champ 'Auteur - Nom' est obligatoire. Saisissez un nom valid.",
          base_url: baseUrl}));
      }
      // Upload de l'image vers le dossier images
      if (req.file) {
    	console.log("Fichier téléchargé avec succès : " + urlCoverImage);
     } else {
    	console.log("Aucun fichier sélectionné.");
      res.render("admin", {
        messageImage: "Veuillez choisir un fichier.",
        base_url: baseUrl,
        });
    }

     } catch (error) {
        console.error('Erreur de validation:', error.message);
        return res.status(400).render("admin", {
        message: error.message,
        base_url: baseUrl
        });
      }

    // Requête pour insérer les informations du livre
    const createProcedureSql = `CALL INSERT_BOOK(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
        messageImage: "Fichier téléchargé avec succès.",
        base_url: baseUrl,
        });
      }; 
  })                    
}

