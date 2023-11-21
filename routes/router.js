import express from "express";
import HomeController from "../controllers/HomeController.js";
import AboutController from "../controllers/AboutController.js";
import { ReadingsController, ClassicsCategory, ContemporarysCategory } from "../controllers/ReadingsController.js";
import DetailsReadingsController from "../controllers/DetailsReadingsController.js";
import ContactController from "../controllers/ContactController.js";
import { InscriptionController, InscriptionSubmit } from "../controllers/InscriptionController.js";
import { ConnexionController, ConnexionSubmitUser} from "../controllers/ConnexionController.js";
import { ConnexionAdminController, ConnexionSubmitAdmin } from "../controllers/ConnexionAdminController.js";
import { UserController } from "../controllers/UserController.js";
import { AdminController } from "../controllers/AdminController.js";

const router = express.Router();


//liste des routes
//Home
router.get("/", HomeController);

//About
router.get("/about", AboutController);

//Readings
router.get("/readings", ReadingsController);
router.get("/readings_contemporarys", ContemporarysCategory);
router.get("/readings_classics", ClassicsCategory);

//DetailsReadings
router.get("/details_readings/:id", DetailsReadingsController);

//Contact
router.get("/contact", ContactController);

//Inscriptions
router.get("/inscription", InscriptionController);
router.post("/inscription", InscriptionSubmit);

//Connexion
router.get("/connexion", ConnexionController);
router.post("/connexion", ConnexionSubmitUser);
router.get("/connexion_admin", ConnexionAdminController);
router.post("/connexion_admin", ConnexionSubmitAdmin);



// user
router.get("/user", UserController);


//Admin
router.get("/admin", AdminController);

export default router;