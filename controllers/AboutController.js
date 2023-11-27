import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const AboutController = (req, res) => {
    res.render("about", { base_url: baseUrl});
}

export default AboutController;