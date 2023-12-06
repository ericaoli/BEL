import pool from "../config/database.js";
import { baseUrl } from "../server.js";



const AboutController = (req, res) => {
    res.render("about", { base_url: baseUrl});
}

export default AboutController;