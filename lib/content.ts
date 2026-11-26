// lib/content.ts - every word on the landing page lives here, so copy changes
// and A/B variants never touch the layout components.
//
// Before launch, check the lines marked CONFIRM: they describe how the trial
// and onboarding work, and must match what the team actually offers.

export const site = {
  tagline: "Order Quick",
  // Trial requests open a pre-filled WhatsApp chat with this number.
  whatsappNumber: "916393374440",
  whatsappDisplay: "+91 63933 74440",
};

export const announcement = {
  label: "Announcements",
  items: [
    "Now going live at Maholi Rasoi & Cafe",
    "15-day free trial for restaurants",
    "No app for guests: scan, order, pay",
    "UPI, cards, net banking and wallets",
    "Menu and table QRs set up by our team",
  ],
};

export const nav = {
  links: [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ],
  cta: { href: "/#start-trial", label: "Start free trial", short: "Free trial" },
};

export const hero = {
  eyebrow: "QR code ordering & billing system for restaurants",
  headline: { before: "Let your tables", highlight: "take the orders.", after: "" },
  subhead:
    "Guests scan, order and pay from their phones. Every order reaches your kitchen with its table number, and the bill writes itself.",
  primaryCta: { href: "#start-trial", label: "Start my 15-day free trial" },
  secondaryCta: { href: "#how-it-works", label: "See how an order flows" },
  // CONFIRM: trial terms.
  reassurance: ["15 days free", "No card needed", "We set it up with you"],
};

export const trust = {
  partnerLabel: "Launch partner",
  partnerName: "Maholi Rasoi & Cafe",
  partnerStatus: "First kitchen going live on OQwik",
  paymentsLabel: "Guests pay the way they already do",
  payments: ["UPI", "Debit & credit cards", "Net banking", "Wallets"],
};

export const valueProps = {
  eyebrow: "What changes on day one",
  title: "Less running. Fewer mistakes. Money in before the plates are cleared.",
  items: [
    {
      icon: "timer",
      title: "Orders start the moment guests sit down",
      body: "Nobody waits to catch a waiter's eye. The menu is already on their phone, so the first order goes in within minutes and the table turns sooner.",
    },
    {
      icon: "target",
      title: "Every order lands on the right table",
      body: "The QR knows which table it sits on. Each order carries that table number from the guest's phone to the kitchen ticket to the bill, so no one has to remember it.",
    },
    {
      icon: "wallet",
      title: "Paid before they ask for the bill",
      body: "Guests pay online when they order. No waiting at the counter, no chasing a table that left, and every payment is matched to its order automatically.",
    },
  ],
};

export type JourneyStep = {
  time: string;
  actor: "Guest" | "Kitchen" | "Owner";
  title: string;
  body: string;
  points: string[];
  scene: "scan" | "menu" | "pay" | "kitchen" | "bill";
};

export const howItWorks = {
  eyebrow: "How QR table ordering works",
  title: "Follow one order at Table 7, from scan to served",
  intro:
    "This is what happens on a busy evening once OQwik is on your tables. Nobody walks an order slip anywhere, and nobody has to remember which table ordered what.",
  // Set to a YouTube/Vimeo embed or an .mp4 path when the explainer video is ready.
  videoUrl: "",
  steps: [
    {
      time: "8:40 PM",
      actor: "Guest",
      title: "Sits down and scans the table QR code to order",
      body: "The QR on Table 7 opens your menu in the phone's browser. Nobody downloads an app or waits for a waiter to bring menus.",
      points: ["Works with any phone camera", "Table number captured automatically"],
      scene: "scan",
    },
    {
      time: "8:41 PM",
      actor: "Guest",
      title: "Browses your menu and builds the order",
      body: "Photos, prices, veg and non-veg markers, and options like portion size. Dishes you mark sold out disappear instantly.",
      points: ["Your logo and brand colours", "Options and add-ons per dish"],
      scene: "menu",
    },
    {
      time: "8:42 PM",
      actor: "Guest",
      title: "Pays online in one tap",
      body: "UPI, cards, net banking or wallets. The order is only sent once the payment succeeds, so there are no unpaid tables to chase.",
      points: ["₹567 paid by UPI, GST included", "Payment matched to Table 7"],
      scene: "pay",
    },
    {
      time: "8:42 PM",
      actor: "Kitchen",
      title: "The kitchen gets a KOT tagged Table 7",
      body: "The order appears on your kitchen board and prints on your thermal printer. Staff move it from New to Preparing to Ready, and the guest sees each update.",
      points: ["No handwritten slips", "Live order status for the guest"],
      scene: "kitchen",
    },
    {
      time: "8:58 PM",
      actor: "Owner",
      title: "Food served, bill closed, table free",
      body: "The GST bill is already made and on the guest's phone. Today's sales on your dashboard update by themselves.",
      points: ["CGST and SGST worked out", "Table ready for the next guests"],
      scene: "bill",
    },
  ] satisfies JourneyStep[],
};

export const features = {
  eyebrow: "QR menu, KOT and GST billing in one system",
  title: "Built for a real Saturday-night rush",
  items: [
    { icon: "qr", title: "A QR for every table", body: "Each table gets its own code, so every order arrives already tagged with where to take it." },
    { icon: "menu", title: "A menu you can change in seconds", body: "Edit prices, add today's special or mark a dish sold out. Guests see it on their next scan." },
    { icon: "card", title: "Online payments built in", body: "UPI, cards, net banking and wallets at checkout, with every payment matched to its order." },
    { icon: "chef", title: "Live kitchen board", body: "New orders appear the second they're paid. Move them from preparing to ready to served." },
    { icon: "printer", title: "KOT and bill printing", body: "Send kitchen tickets and bills to a thermal printer, so the cook's routine doesn't change." },
    { icon: "receipt", title: "GST bills, done for you", body: "Every order becomes an itemised bill with taxes worked out. Guests get it on their phone." },
    { icon: "walkin", title: "Counter and walk-in orders", body: "Staff can punch in orders for guests who'd rather talk, so every sale runs through one system." },
    { icon: "chart", title: "Sales reports", body: "See today's takings, your best-selling dishes and your busiest tables without adding up a single slip." },
  ],
};

// CONFIRM: get Adarsh's approval on this exact wording before launch.
export const testimonial = {
  quote:
    "On a full evening my team spent half its time walking orders between tables and the kitchen. Now the orders come to us already paid and already on the right table, and my staff can give that time back to our guests.",
  name: "Adarsh Pratap Singh",
  role: "Owner, Maholi Rasoi & Cafe",
  photoAlt: "The counter at Maholi Rasoi & Cafe, decorated with marigold garlands under the Maholi sign",
  detailAlt: "A woven bamboo lamp glowing warm over the dining area at Maholi Rasoi & Cafe",
};

export const pricing = {
  eyebrow: "Pricing",
  title: "One plan per outlet. Everything included.",
  body: "Pricing depends on your outlet and number of tables, so we quote it on a short call. Your first 15 days cost nothing either way.",
  planName: "OQwik for your restaurant",
  badge: "15 days free",
  priceLabel: "Free for 15 days",
  priceNote: "then a simple monthly plan, quoted for your outlet",
  // CONFIRM: what the paid plan includes.
  includes: [
    "QR codes for all your tables",
    "Digital menu with photos and options",
    "Online payments at the table",
    "Live kitchen board and KOT printing",
    "Automatic GST billing",
    "Sales reports",
    "Menu setup and staff training from our team",
  ],
  cta: { href: "#start-trial", label: "Get my quote and free trial" },
  freeTool: {
    title: "Not ready for ordering yet?",
    body: "Put your menu on a QR code today with our free generator. No sign-up.",
    link: { href: "/free-qr-menu-generator", label: "Make a free QR menu" },
  },
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions restaurant owners ask us first",
  panelLabel: "Frequently asked questions",
  more: "More questions",
  help: {
    title: "Still have a question?",
    body: "Message our team on WhatsApp. We'll answer it, or walk you through OQwik on a quick call.",
    cta: "Ask us on WhatsApp",
    message: "Hi OQwik, I have a question before starting my free trial.",
  },
  items: [
    {
      q: "Do my guests need to download an app?",
      a: "No. Scanning the table QR opens your menu in the phone's browser. It works on any smartphone with a camera.",
    },
    {
      q: "How do guests scan the QR code to order food?",
      a: "They open the phone camera (or Google Lens, or any UPI app's scanner) and point it at the QR on their table. Your menu opens with the table number already filled in. They add dishes, pay online and the order goes straight to your kitchen. No waiter, no app download.",
    },
    {
      q: "What do I need to get started?",
      a: "Your menu and an internet connection. Your team runs the kitchen board on a phone, tablet or laptop. A thermal printer is optional if you want printed KOTs and bills.",
    },
    {
      q: "Does OQwik work for cafes, QSRs and fine-dining restaurants?",
      a: "Yes. It works wherever guests sit at a table: cafes, family restaurants, dhabas, QSRs (quick-service restaurants) and fine-dining rooms. Each table's QR tags its own orders, and staff can punch in counter and walk-in orders on the same system.",
    },
    {
      q: "How does the free trial work?",
      a: "Send us your details on WhatsApp from the form below. We load your menu, set up QR codes for your tables and show your staff the kitchen board. You use everything free for 15 days, with no card required.",
    },
    {
      q: "How do online payments reach my bank account?",
      a: "Payments go through a licensed payment gateway and are settled to your bank account. We help you connect your account during setup.",
    },
    {
      q: "How is this different from my PhonePe, Paytm or Google Pay QR?",
      a: "A PhonePe, Paytm or Google Pay QR on your counter only collects money. Your staff still take the order, write the KOT and match the payment to the table. An OQwik table QR takes the order itself: the guest picks dishes, pays (with PhonePe, Google Pay, Paytm or any UPI app), and the kitchen gets a KOT tagged with the table, already paid.",
    },
    {
      q: "What is a KOT in a restaurant?",
      a: "KOT stands for Kitchen Order Ticket: the slip that tells the kitchen what to cook and for which table. With OQwik, every paid QR order creates its KOT automatically, tagged with the table number. It shows on your kitchen board and prints on your thermal printer if you use one.",
    },
    {
      q: "How much GST is charged on restaurant food?",
      a: "Most standalone restaurants charge 5% GST on food (2.5% CGST + 2.5% SGST), without input tax credit. Restaurants inside hotels with a room tariff of ₹7,500 or more charge 18%. OQwik works out the tax on every bill at the rate you set, so check your rate with your CA once during setup.",
    },
    {
      q: "Does OQwik replace Zomato or Swiggy?",
      a: "No, they do different jobs. Stay a Zomato or Swiggy restaurant partner for delivery orders. OQwik handles the guests already sitting at your tables: their orders, KOTs, payments and bills, straight between you and them.",
    },
    {
      q: "Can staff still take orders the old way?",
      a: "Yes. Staff can enter counter or walk-in orders from the dashboard, so every order goes through the same kitchen board and bill.",
    },
    {
      q: "Can I change my menu and prices myself?",
      a: "Anytime, from your dashboard. Mark a dish sold out, update a price or add a special, and guests see it on their next scan.",
    },
    {
      q: "What happens after the 15 days?",
      a: "You decide. Keep going on a monthly plan quoted for your outlet, or stop. There's no card on file, so nothing is charged automatically.",
    },
  ],
};

export const closing = {
  eyebrow: "15 days free",
  title: "Run your next rush without running between tables.",
  body: "Tell us about your restaurant. Your details open in WhatsApp, ready to send. We reply to set up your menu and table QRs, and your 15-day free trial starts the day you go live.",
  form: {
    submit: "Start my free trial",
    successTitle: "WhatsApp is open with your details.",
    successBody: "Tap send in WhatsApp and we'll reply to set up your menu and table QRs.",
    reopen: "WhatsApp didn't open? Send it from here",
    editAgain: "Edit my details",
    privacy: "We only use these details to set up your trial.",
    privacyLink: "Privacy policy",
  },
};

export const footer = {
  tagline: "QR code ordering, KOT and GST billing for restaurants in India.",
  columns: [
    {
      title: "Product",
      links: [...nav.links, { href: "/qr-code-menu", label: "QR code menu" }],
    },
    {
      title: "Free tools",
      links: [{ href: "/free-qr-menu-generator", label: "QR code menu generator" }],
    },
  ],
  maker: { prefix: "A product by", name: "Nivabyte Software", href: "https://www.nivabytesoftware.com/" },
  legal: [
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms-and-conditions", label: "Terms and conditions" },
  ],
};
