import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const ContactController = (req, res) => {
    res.render("contact", {base_url: baseUrl});
}

export default ContactController;