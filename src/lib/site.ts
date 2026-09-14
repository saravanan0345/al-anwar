export const PHONE_DISPLAY = "+91 99405 66624";
export const PHONE_LINK = "tel:+919940566624";

export const whatsappLink = (message: string) =>
  `https://wa.me/919940566624?text=${encodeURIComponent(message)}`;

export const serviceMessages = {
  interior: "Hi, I’m interested in Interior Design services from AL-ANWAR Build & Design. I would like to discuss my requirements.",
  construction: "Hi, I’m interested in Construction & Building services from AL-ANWAR Build & Design.",
  ro: "Hi, I’m interested in RO Water Purification services from AL-ANWAR Build & Design.",
};

export const validateImage = (file: File, maxMb: number) => {
  if (!file.type.startsWith("image/")) return "Please choose an image file.";
  if (file.size > maxMb * 1024 * 1024) return `Image must be smaller than ${maxMb}MB.`;
  return null;
};