export default function makeSlug(text) {
  const turkishChars = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
    ı: "i",
    I: "i",
    ü: "u",
    Ü: "U",
  };

  text = text
    .split("")
    .map((char) => turkishChars[char] || char)
    .join("");

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}
