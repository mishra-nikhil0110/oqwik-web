// lib/sample-order.ts - the one example order the hero and the journey both
// show (Table 7, ₹540), so every number on the page agrees.
//
// Photos: Pixabay (Pixabay Content License, free commercial use, no attribution
// required) except chilli-potato, which comes from our own uploads.
//   paneer-tikka     pixabay.com/photos/paneer-tikka-cheese-seek-kebab-4929034/
//   chicken-biryani  pixabay.com/photos/biryani-chicken-rice-meal-dinner-8326234/
//   butter-naan      pixabay.com/photos/pakistani-plain-naan-naan-roti-7155154/
//   masala-chai      pixabay.com/photos/tea-chai-hot-drink-indian-cup-1770422/

export type Dish = {
  name: string;
  note: string;
  price: number;
  veg: boolean;
  qty: number;
  image: string;
};

export const sampleRestaurant = { name: "Saffron Table", initials: "ST", cuisine: "North Indian · Cafe", table: "Table 7" };

export const menu: Dish[] = [
  { name: "Paneer Tikka", note: "Smoky, with mint chutney", price: 280, veg: true, qty: 1, image: "/images/dishes/paneer-tikka.webp" },
  { name: "Chicken Biryani", note: "Dum-cooked, with raita", price: 320, veg: false, qty: 0, image: "/images/dishes/chicken-biryani.webp" },
  { name: "Chilli Potato", note: "Crispy, honey-chilli glaze", price: 180, veg: true, qty: 1, image: "/images/dishes/chilli-potato.webp" },
  { name: "Butter Naan", note: "From the tandoor", price: 40, veg: true, qty: 2, image: "/images/dishes/butter-naan.webp" },
  { name: "Masala Chai", note: "Ginger and cardamom", price: 40, veg: true, qty: 0, image: "/images/dishes/masala-chai.webp" },
];

export const orderLines = menu.filter((d) => d.qty > 0);
export const itemCount = orderLines.reduce((n, d) => n + d.qty, 0);
export const subtotal = orderLines.reduce((n, d) => n + d.qty * d.price, 0); // ₹540

// GST for a non-AC restaurant: 5% total, split equally as CGST and SGST.
export const cgst = Math.round(subtotal * 0.025 * 100) / 100;
export const sgst = cgst;
export const grandTotal = subtotal + cgst + sgst;

export const kot = { number: "#1042", time: "8:42 PM" };

export const rupees = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
