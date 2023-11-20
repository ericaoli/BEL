import express from "express";
import router from "./routes/router.js";
import parseurl from "parseurl";
import session from "express-session";


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
app.use(
	session({
		// clé qui sert à identifier une session dans le navigateur, elle garantie la sécurité des sessions
		secret: "itsasecret",

		// resave permet d'enregistrer une session mais peut créer des conflits en cas de requête multiple
		// car écrasement au niveau des modifications de session. False est meilleure
		resave: false,
		
		// permet d'initialiser et enregistrer n'importe quelle session dans le store de session
		saveUninitialized: true,
	}),
);

//MiddleWare - PAGES PROTEGEES
app.use((req, res, next) => {
	let pathname = parseurl(req).pathname.split("/");
	console.log(pathname);

	let protectedPath = ["user"];

	//si la session user n'existe pas et que l'url fait partie des urls protégées
	if (!req.session.user && protectedPath.indexOf(pathname[1]) !== -1) {
		res.redirect("/");
	} else {
		next();
	}
});


// Création d'une variable pour l'utiliser la session dans le template
app.use(function (req, res, next) {
	if (!req.session.user) {
		res.locals.user = false;
	} else {
		res.locals.user = true;
	}
	next();
});


//appel du routeur
app.use("/", router);

// lancement du serveur sur un port choisi
app.listen(port, () => {
	console.log(`Server is running at ${baseUrl}`);
});