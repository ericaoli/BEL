import express from "express";
import { validationResult, body } from 'express-validator';
import HomeController from "../controllers/HomeController.js";
import AboutController from "../controllers/AboutController.js";
import { ReadingsController, ClassicsCategory, ContemporarysCategory } from "../controllers/ReadingsController.js";
import DetailsReadingsController from "../controllers/DetailsReadingsController.js";
import { InscriptionController, InscriptionSubmit } from "../controllers/InscriptionController.js";


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

//Inscriptions
router.get("/inscription", InscriptionController);
router.post("/inscription", InscriptionSubmit);


export default router;