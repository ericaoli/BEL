import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const DetailsReadingsController = (req, res) => {
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

export default DetailsReadingsController;