import express from "express";
import session from "express-session";
import router from "./routes/router.js";
import parseurl from "parseurl";
import dotenv from "dotenv";


const app = express();
const port = 9000;
const hostname = "localhost";
export const baseUrl = "http://localhost:9000";

// indique la localisation des fichiers statiques js, images et css
app.use(express.static("public"));

// utilisation des templates ejs => moteur d'affichage
app.set("views", "./views");
app.set("view engine", "ejs");

//pour l'utilisation du json à la réception des données formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//initialisation du système de sessions
dotenv.config();
app.use(
	session({
		secret: process.env.SECRET_SESSION,
		resave: false,
		saveUninitialized: true,
	}),
);

// Création des variables de session

// variable de session pour l'admin
app.use(function (req, res, next) {
	if (!req.session.admin) {
		res.locals.admin = false;
	} else {
		res.locals.admin = true;
	}
	next();
});

// variable de session pour l'user
app.use(function (req, res, next) {
	if (!req.session.user) {
		res.locals.user = false;
	} else {
		res.locals.user = true;
	}
	next();
});

// variable de session pour book
app.use(function (req, res, next) {
	if (!req.session.book) {
		res.locals.book = false;
	} else {
		res.locals.book = true;
	}
	next();
});

//MiddleWare - PAGES PROTEGEES
app.use((req, res, next) => {
	let pathname = parseurl(req).pathname.split("/");
	console.log(`Middleware de verification de session: ${pathname}`);

	let protectedPath = ["admin","add_book", "edit_book"];
	let protectedPathUser = ["user"];
	//console.log(`protectedpath: ${protectedPathUser}`);
	
	//si la session admin n'existe pas et que l'url fait partie des urls protégées
	if (!req.session.admin && protectedPath.indexOf(pathname[1]) !==-1) {
		console.log("Admin non authentifié et route protégée. Rédirige vers /")
		res.redirect("/");
	} else if (!req.session.user && protectedPathUser.indexOf(pathname[1]) !==-1) {
		console.log("User non authentifié et route protégée. Rédirige vers /")
		res.redirect("/");
	} else {
		next();
	}
	
	console.log("Pathname:", pathname);
	console.log("Session admin:", req.session.admin);
	console.log("URL complète:", req.url)
});




//appel du routeur
app.use("/", router);

// lancement du serveur sur un port choisi
app.listen(port, () => {
	console.log(`Server is running at ${baseUrl}`);
});