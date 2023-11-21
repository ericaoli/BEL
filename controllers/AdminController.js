import pool from "../config/database.js";
import { baseUrl } from "../server.js";

// pour faire l'affichage de la page connexion
export const AdminController = (req, res) => {
    res.render("admin",{ admin: req.session.admin, base_url: baseUrl });
}

export const AddBooks = (req, res) => {

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
    const author = req.body.author;
    
    let addBook = "INSERT INTO books (title, publication_year, description, ISBN, url_cover_image, alt_text, date_reading_club, ib_book_category, id_editor, id_author) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";



    pool.query(addBook, [title, publicationYear, description, isbn, urlCoverImage, altText, dateReadingClub, idBookCategory, editor, author])



}