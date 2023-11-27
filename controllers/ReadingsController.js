import pool from "../config/database.js";
import { baseUrl } from "../server.js";

export const ReadingsController = (req, res) => {
	// requete SQL qui récupére tous les livres
	let sqlAll = `SELECT id_book, id_book_category, title, url_cover_image, alt_text FROM books`;
			 
	pool.query(sqlAll, function (error, book, fields) {
		res.render("readings", { base_url: baseUrl, books: book });
		
	});
};

export const ClassicsCategory = (req, res) => {
let id = req.params.id;

//requete SQL qui récupére les livres par la categorie classiques
let sqlClassics = `SELECT b.id_book, b.title, b.url_cover_image, b.alt_text,
	                bc.wording
		        	FROM books b
	                INNER JOIN book_category bc ON b.id_book_category = bc.id_book_category
	           		WHERE bc.id_book_category = 1`;

pool.query(sqlClassics, [id], function (error, book, fields) {
	res.render("readings_classics", { base_url: baseUrl, books: book});
	console.log(book);
	});
};

export const ContemporarysCategory = (req, res) => {
let id = req.params.id;
	// requete SQL qui récupére les livres par la categorie contemporaines
	let sqlContemporarys = `SELECT b.id_book, b.title, b.url_cover_image, b.alt_text,
							bc.wording
							FROM books b
							INNER JOIN book_category bc ON b.id_book_category = bc.id_book_category
				   			WHERE bc.id_book_category = 2`;
	
	pool.query(sqlContemporarys, [id], function (error, book, fields) {
		res.render("readings_contemporarys", { base_url: baseUrl, books: book});
		console.log(book);
		});
	};
