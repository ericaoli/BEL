import mysql from "mysql";


let pool = mysql.createPool({
	host: "db.3wa.io", 
	user: "ericaoliveiraeplouadoudi", 
	password: "c4bca99da67d0b486005d3b19be40fb9", 
	database: "ericaoliveiraeplouadoudi_bel"
});

// Connexion à la base de données
pool.getConnection((err, connection) => {
	console.log("Connected to the database");
	if (err) throw err;
});

export default pool;