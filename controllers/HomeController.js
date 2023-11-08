import pool from "../config/database.js";

const hostname = "localhost";
const port = 9000;
const baseUrl = "http://localhost:9000";

const HomeController = (req, res) => {
    res.render("home", {base_url: baseUrl});
}

export default HomeController;