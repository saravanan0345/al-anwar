export const PHONE_DISPLAY = "+91 99405 66624";
export const PHONE_LINK = "tel:+919940566624";
export const BUSINESS_NAME = "ALANWAR Build & Design";
export const BUSINESS_URL = "https://al-anwar-buildanddesign.in";
export const CONTACT_ADDRESS = {
  streetAddress: "Plot No. 8, Moovendhar Nagar",
  locality: "Pillaiyar Madanthingal, Near Srimat Montessori",
  area: "Noombal, Thiruverkadu",
  region: "Chennai, Tamil Nadu",
  postalCode: "600077",
};
export const CONTACT_ADDRESS_LINES = [
  CONTACT_ADDRESS.streetAddress,
  CONTACT_ADDRESS.locality,
  CONTACT_ADDRESS.area,
  `${CONTACT_ADDRESS.region} – ${CONTACT_ADDRESS.postalCode}`,
];
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CONTACT_ADDRESS_LINES.join(", ")}`)}`;

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