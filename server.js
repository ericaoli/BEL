import express from "express";
import router from "./routes/router.js";


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

//appel du routeur
app.use("/", router);

// lancement du serveur sur un port choisi
app.listen(port, () => {
	console.log(`Server is running at ${baseUrl}`);
});