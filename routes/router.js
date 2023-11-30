import express from "express";
import HomeController from "../controllers/HomeController.js";
import AboutController from "../controllers/AboutController.js";
import { ReadingsController, ClassicsCategory, ContemporarysCategory } from "../controllers/ReadingsController.js";
import { DetailsReadingsController, LikeReadings} from "../controllers/DetailsReadingsController.js";
import { ContactController, ContactSubmit } from "../controllers/ContactController.js";
import { InscriptionController, InscriptionSubmit } from "../controllers/InscriptionController.js";
import { ConnexionController, ConnexionSubmitUser, Logout } from "../controllers/ConnexionController.js";
import { UserController} from "../controllers/UserController.js";
import { AdminController, AddBooks, DeleteBooks} from "../controllers/AdminController.js";
import upload from "../helpers/upload.js";

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
router.post("/details_readings/:id", DetailsReadingsController);
router.post("/details_readings/:id/like", LikeReadings);
//router.get("/details_readings/:id", LikeReadings);

//Contact
router.get("/contact", ContactController);
router.post("/contact", ContactSubmit);

//Inscriptions
router.get("/inscription", InscriptionController);
router.post("/inscription", InscriptionSubmit);

//Connexion
router.get("/connexion", ConnexionController);
router.post("/connexion", ConnexionSubmitUser);


// user
router.get("/user", UserController);
// router.get("/user/library", UserLibrary);
router.get("/logout", Logout);


//Admin
router.get("/admin", AdminController);
router.post("/admin", upload.single("url_cover_image"), AddBooks);
router.post("/readings", DeleteBooks);


export default router;