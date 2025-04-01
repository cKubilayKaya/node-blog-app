import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/posts"); // Dosya kaydedilecek yer
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, ext); // Uzantı olmadan dosya adı
    const timestamp = Date.now(); // Zaman damgası
    const newFileName = `${fileNameWithoutExt}-${timestamp}${ext}`; // Dosya adı + zaman damgası
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, and WEBP formats are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
  fileFilter,
});

export default upload;
