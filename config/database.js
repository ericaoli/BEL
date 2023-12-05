import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

let pool = mysql.createPool({
	connectionLimit: 10000,
	host: process.env.DATABASE_HOST, 
	user: process.env.DATABASE_USER, 
	password: process.env.DATABASE_PASSWORD, 
	database: process.env.DATABASE_BASE
});


// Connexion à la base de données
pool.getConnection((err, connection) => {
	console.log("Connected to the database");
	if (err) throw err;
});

export default pool;