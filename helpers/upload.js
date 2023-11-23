import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./public/images");
	},
	filename: function (req, file, callback) {
		console.log(file);
		callback(null, new Date().getTime() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
});

export default upload;