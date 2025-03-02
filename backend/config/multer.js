import multer from "multer";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: "uploads/", // Folder where images are saved
    filename: (req, file, cb) => {
        // Extract file extension
        const ext = path.extname(file.originalname);
        // Create a unique filename with the extension
        const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, filename);
    },
});

const multerUpload = multer({ storage });

export { multerUpload }