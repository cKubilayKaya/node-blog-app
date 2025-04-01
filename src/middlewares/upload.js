import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname'i ES Modules içinde doğru şekilde kullanmak için:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // Dosyanın yükleneceği yol
      const uploadPath = path.join(__dirname, `../uploads/${folder}`);

      // Klasörün var olup olmadığını kontrol et ve yoksa oluştur
      fs.mkdirSync(uploadPath, { recursive: true });

      // Dosya kaydetme yolunu belirle
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Dosya uzantısını al
      const fileNameWithoutExt = path.basename(file.originalname, ext); // Uzantısız dosya ismi
      const timestamp = Date.now(); // Zaman damgası
      const newFileName = `${fileNameWithoutExt}-${timestamp}${ext}`; // Yeni dosya ismi
      cb(null, newFileName);
    },
  });
};

// Dosya türünü kontrol et
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, and WEBP formats are allowed"), false);
  }
  cb(null, true);
};

// Profile Image Upload
export const uploadProfileImage = multer({
  storage: getStorage("users"), // users klasörüne kaydedilecek
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter,
});

// Post Image Upload
export const uploadPostImage = multer({
  storage: getStorage("posts"), // posts klasörüne kaydedilecek
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter,
});
