
import pool from "../config/database.js";
import { baseUrl } from "../server.js";

// pour faire l'affichage de la page admin avec la session
export const AdminController = (req, res) => {
    res.render("admin",{ admin: req.session.admin, base_url: baseUrl});				 
}

// pour ajouter un nouveau livre
export const AddBooks = (req, res) => {

  if (req.method === "GET") {
    // Si la requisition est GET, affiche le formulaire
    res.render("add_book", { base_url: baseUrl });

  } else if (req.method === "POST") {
  // Si la requisition est POST, envoie le formulaire

  // déclaration de variables
    const title = req.body.title;
    const publicationYear = req.body.parution;
    const description = req.body.description;
    const isbn = req.body.ISBN;
    const urlCoverImage = req.file ? req.file.filename : null;
    const altText = req.body.alt_text;
    const dateReadingClub = req.body.date_reading_club;
    const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    const idBookCategory = (req.body.id_book_category === '1' || req.body.id_book_category === '2') ? req.body.id_book_category : null;
    const editor = req.body.editor;
    const authorFistname = req.body.author_firstname;
    const authorLastname = req.body.author_lastname;

    // validation des champs du formulaire
     try {   
      console.log('AdminController - je suis dans le try catch'); 
      console.log('AdminController - altText.1 = ' + altText); 
      console.log('AdminController - altText.2= ' + req.body.alt_text); 
        if (!title || title.length > 250) {
          throw new Error (res.render("add_book", {
            messageTitle: "Le champ 'Titre' est obligatoire. Taille maximale : 250 caractères.",
            base_url: baseUrl}));
        }
        if (!publicationYear || publicationYear.length !== 4 || isNaN(publicationYear)) {
          throw new Error (res.render("add_book", {
            messagePublicationYear: "Le champ 'Année de parution' est obligatoire. Veuillez saisir 4 chiffres.",
            base_url: baseUrl}));
        }
        if (!description || description.length > 4000) {
          throw new Error (res.render("add_book", {
            messageDescription: "Le champ 'Description' est obligatoire. Taille maximale : 4000 caractères.",
            base_url: baseUrl}));
        }
        if (!isbn || isbn.length !== 13 || isNaN(isbn)) {
          throw new Error (res.render("add_book", {
            messageIsbn: "Le champ 'ISBN' est obligatoire. Veuillez saisir 13 chiffres.",
            base_url: baseUrl}));
        }
        if (!altText || altText.length > 100) {
         throw new Error (res.render("add_book", {
           messageAltText: "Le champ 'alt_text' est obligatoire. Veuillez saisir un text descriptif de l'image.",
           base_url: baseUrl}));
         }
        if (!urlCoverImage) {
          throw new Error (res.render("add_book", {
            messageImage: "Champ obligatoire. Veuillez choisir l'image de couverture du livre.",
            base_url: baseUrl}));
        }
        if (!dateReadingClub) {
          throw new Error (res.render("add_book", {
            messageDateReading: "Le champ 'Date de lecture au club' est obligatoire et doit être au format jj/mm/aaaa.",
            base_url: baseUrl}));
        }
        if (!idBookCategory || (idBookCategory !== '1' && idBookCategory !== '2')) {
          throw new Error (res.render("add_book", {
            messageIdBookCategory: "Le champ 'Categorie du livre' est obligatoire. Choisissez Classique ou Contemporain.",
            base_url: baseUrl}));
        }
        if (!editor || !/^[a-zA-Z]+$/.test(editor)) {
          throw new Error (res.render("add_book", {
            messageEditor: "Le champ 'Editeur' est obligatoire. Saisissez un nom valid.",
            base_url: baseUrl}));
        }
        if (!authorFistname || !/^[a-zA-Z]+$/.test(authorFistname)) {
          throw new Error (res.render("add_book", {
            messageAuthorFirstname: "Le champ 'Auteur - Prénom' est obligatoire. Saisissez un nom valid.",
            base_url: baseUrl}));
        }
        if (!authorLastname || !/^[a-zA-Z]+$/.test(authorLastname)) {
          throw new Error (res.render("add_book", {
            messageAuthorLastname: "Le champ 'Auteur - Nom' est obligatoire. Saisissez un nom valid.",
            base_url: baseUrl}));
        }
        // Upload de l'image vers le dossier images
        if (req.file) {
     	   console.log("Fichier téléchargé avec succès : " + urlCoverImage);
         } else {
         console.log("Aucun fichier sélectionné.");
         res.render("add_book", {
           messageImage: "Veuillez choisir un fichier.",
           base_url: baseUrl,
           });
         }
      } catch (error) {
         console.error('Erreur de validation:', error.message);
         return res.status(400).json({
         message: error.message,
         base_url: baseUrl
         });
    
       }

    // Requête pour insérer les informations du livre sur la base de données
    
    const createProcedureSql = `CALL INSERT_BOOK(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(createProcedureSql, [title, publicationYear, description, isbn, urlCoverImage, altText, dateReadingClub, idBookCategory, editor, authorFistname, authorLastname], (error, result) => {
    if (error) {
        console.error("Erreur requête SQL:", error);
        res.status(500)({
        message: "Erreur du serveur. Veuillez essayer plus tard.",
        base_url: baseUrl,
        });
      } else {
        console.log(result);
        res.render("add_book", {
        message: "Le livre a été bien enregistré.",
        messageImage: "Fichier téléchargé avec succès.",
        base_url: baseUrl,
        });
      }; 
  })
} else {
  // Méthode non supportée
  res.status(405).send("Méthode non autorisée");
}                 
}

//pour supprimer un livre
export const DeleteBooks = (req, res) => {
  let deleteBook = "DELETE FROM books WHERE id_book = ?";
  
  let id = req.body.id;

  let admin = req.session.admin;

  if (!admin) {
    return res.status(403).send("Apenas administradores podem excluir livros.");
  }

  pool.query(deleteBook, [id], (error, result) => {
    if(error) {
      console.error("Erreur requête SQL:", error);

    } else {
        console.log(`Le livre : ${id} a été supprimé par ${admin.firstname}`);
        res.redirect("/readings");
    }
  });
}

// pour faire l'affichage de la page edit_book
export const EditBookForm = (req, res) => {
  res.render("edit_book", { base_url: baseUrl, admin: req.session.admin}); 
}
export const EditBook = (req, res) => {
  console.log(`Je rentre dans la fonction EditBook`);

  // para a formatação da data
  function formatDateForInput(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  let admin = req.session.admin;
  if (!admin) {
    return res.status(403).send("Seulement l'administrateur peut modifier un livre.");
  }

  let id = req.params.id;
  console.log(`Récuperation du livre qui sera modifié: ${id}`);

  // 1. Recuperar as informações do livro para enviá-las ao formulário de edição
  let selectBookQuery = `SELECT b.id_book, b.title, b.publication_year, b.description, b.ISBN, b.url_cover_image, b.alt_text, b.date_reading_club,
      bc.id_book_category, bc.wording category_wording,
      a.id_author, a.firstname author_firstname, a.lastname author_lastname,
      e.id_editor, e.name editor_name
    FROM books b 
      INNER JOIN book_category bc on b.id_book_category = bc.id_book_category
      INNER JOIN author a ON b.id_author = a.id_author
      INNER JOIN editor e ON b.id_editor = e.id_editor
      WHERE id_book = ?`;

  pool.query(selectBookQuery, [id], (selectErr, selectResult) => {
    console.log(`Je rentre dans le query select`);
    if (selectErr) {
      console.error("Erreur requête SQL:", selectErr);
      res.render("error", { message: "Erreur pendant la récuperation des informations du livre." });

    } else {
      console.log("Détails du livre retrouvés lors de la requête:", selectResult[0]);

      if (selectResult.length === 0) {
        console.warn("Le livre n'est pas dans la base de données.");
        res.render("error", { message: "Livre non trouvé." });
        return;

      } else {
        // Informações enviadas aos campos do formulário
        const title = selectResult[0].title;
        const publicationYear = selectResult[0].publication_year;
        const description = selectResult[0].description;
        const isbn = selectResult[0].ISBN;
        const urlCoverImage = selectResult[0].url_cover_image;
        const altText = selectResult[0].alt_text;
        const dateReadingClub = formatDateForInput(selectResult[0].date_reading_club);
        const idBookCategory = selectResult[0].id_book_category;
        const isClassiqueOrContemporain = (idBookCategory === '1' || idBookCategory === '2');
        const categoryWording = isClassiqueOrContemporain ? 'Classique' : 'Contemporain';
        const editor = selectResult[0].editor_name;
        const authorFirstname = selectResult[0].author_firstname;
        const authorLastname = selectResult[0].author_lastname;

        console.log("Book details retrieved successfully:", selectResult[0]);

        res.render("edit_book", {
          book: {
            ...selectResult[0],
            date_reading_club: dateReadingClub,
            isClassiqueOrContemporain: isClassiqueOrContemporain,
            categoryWording: categoryWording
          },
          base_url: baseUrl,
          admin: req.session.admin
        });
      }
    }
  });
};
// Quando o formulário é enviado para atualizar as informações do livro
export const UpdateBook = async(req, res) => {
  console.log(`Je rentre dans la fonction UpdateBook`);

  let id = req.params.id;
  console.log(`Récuperation du livre en UPDATEBOOK: ${id}`);

  const action = req.body.action;

  console.log(`Valor real do campo 'action': ${action}`);

  if(action === "edit") {
    console.log(`JE RENTRE DANS L'ACTION`);
    const title = req.body.title;
    console.log(`TITLE UPDATE: ${title},  ${typeof title}`);
    const publicationYear = req.body.parution;
    console.log(`PUBLICATION YEAR UPDATE: ${publicationYear},  ${typeof publicationYear}`);
    const description = req.body.description;
    console.log(`DESCRIPTION UPDATE: ${description},  ${typeof description}`);
    const isbn = req.body.ISBN;
    console.log(`ISBN UPDATE: ${isbn},  ${typeof isbn}`);
    //const urlCoverImage = req.file ? req.file.filename : req.body.url_cover_image;
    
    const directory = '/images/';
    const existingUrlCoverImage = directory + req.body.url_cover_image; 
    
    const newUrlCoverImage = req.file ? req.file.filename : existingUrlCoverImage; // Use a nova imagem se existir, senão, use a existente
    const urlCoverImage = newUrlCoverImage !== undefined ? newUrlCoverImage : (existingUrlCoverImage !== undefined ? existingUrlCoverImage : 'valor_padrao.jpg'); // Use a nova imagem se existir, senão, use a existente
    
    console.log(`existingUrlCoverImage: ${existingUrlCoverImage}`);
    console.log(`newUrlCoverImage: ${newUrlCoverImage}`);
    console.log(`urlCoverImage: ${urlCoverImage}`);
    console.log(`URL IMAGE UPDATE: ${urlCoverImage},  ${typeof urlCoverImage}`);
    const altText = req.body.alt_text;
    console.log(`ALTTEXT UPDATE: ${altText},  ${typeof altText}`);
    const dateReadingClub = req.body.date_reading_club;
    console.log(`DATEREADING UPDATE: ${dateReadingClub},  ${typeof dateReadingClub}`);
    const idBookCategory = (req.body.id_book_category === '1' || req.body.id_book_category === '2') ? req.body.id_book_category : null;
    console.log(`IDBOOKCATEGORY UPDATE: ${idBookCategory},  ${typeof idBookCategory}`);
    const editor = req.body.editor;
    console.log(`EDITOR UPDATE: ${editor},  ${typeof editor}`);
    const authorFistname = req.body.author_firstname;
    console.log(`AUTOR FIRSTNAME UPDATE: ${authorFistname}, ${typeof authorFistname}`);
    const authorLastname = req.body.author_lastname;
    console.log(`AUTOR LASTNAME UPDATE: ${authorLastname},  ${typeof authorLastname}`);

    // para modificar as informações do livro
    let updateProcedureSql = `CALL UPDATE_BOOK(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(`RESULTADO DA CONSULTA UPDATE:`, updateProcedureSql);
    pool.query(updateProcedureSql, [id, title, publicationYear, description, isbn, urlCoverImage, altText, dateReadingClub, idBookCategory, editor, authorFistname, authorLastname], (error, result) => {
      console.log(`Je rentre dans le query update`);
      if (error) {
        console.error("Erreur requête SQL:", error);
        return res.status(500).json({
          message: "Erreur du serveur. Veuillez essayer plus tard.",
          base_url: baseUrl,
        });
      } else {
        console.log("Resultat de cette modification:", result);
        res.render("edit_book", {
        message: "Le livre a été bien modifié.",
        messageImage: "Fichier téléchargé avec succès.",
        base_url: baseUrl,
        });
      };
    });
  } 
};

//let deleteCommentBook = "DELETE FROM comment WHERE id_book = ?";
//let deleteLikedBook = "DELETE FROM liked WHERE id_book = ?";