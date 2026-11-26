// lib/qr-menu/content.ts - words for /qr-code-menu and /free-qr-menu-generator.
//
// Search intent:
//   /qr-code-menu             owners comparing QR menus ("QR code menu", "QR menu
//                             for restaurant", "digital menu", "scan to order").
//                             Explains the options and why ordering beats reading.
//   /free-qr-menu-generator   owners who want a menu QR right now ("free QR code
//                             generator" / "QR code generator free" / "create QR
//                             code free" for a menu, "PDF to QR code", "PDF QR code
//                             generator", "print QR code"). The tool.
// Each page links to the other and to the trial, so neither competes with the
// home page ("QR code ordering system for restaurants").
//
// Deliberately not targeted (keyword research, 26 Nov 2026): bare "QR code
// generator" / "QR barcode generator" / "QR tag" (generic, not restaurant owners;
// owned by large QR sites) and other brands' names ("Canva codes", "ME-QR",
// "Adobe QR code generator").

export const qrMenuPage = {
  title: "QR Code Menu for Restaurants That Takes Orders",
  description:
    "A QR code menu lets guests scan, browse and order from the table with no app. Compare PDF, digital and ordering QR menus, and see how OQwik sends each order to the kitchen.",
  eyebrow: "QR code menu for restaurants",
  h1: "A QR code menu your guests can order from",
  lead: "Guests scan the QR on their table, browse your dishes with photos and prices, and place the order themselves. It reaches your kitchen as a KOT with the table number, and the GST bill is ready when they are.",
  ctaPrimary: { href: "/#start-trial", label: "Start 15-day free trial" },
  ctaSecondary: { href: "/free-qr-menu-generator", label: "Make a free QR menu" },

  what: {
    title: "What is a QR code menu?",
    body: [
      "A QR code menu is a restaurant menu that opens on a guest’s phone when they point the camera at a QR (quick response) code on the table. There is no app to download: the menu opens in the phone’s browser.",
      "Some QR menus only show the dishes, like a PDF of the printed card. Others let guests order too. They add dishes to a cart, place the order and pay from the table, and the order goes straight to the kitchen.",
    ],
  },

  kinds: {
    eyebrow: "Three kinds of QR menu",
    title: "Reading the menu is the easy part",
    intro: "Every QR menu saves you printing. Only one kind saves your staff the walk to the table and back.",
    columns: ["PDF menu QR", "Digital menu (view only)", "QR ordering menu (OQwik)"],
    rows: [
      { label: "Guests see the menu on their phone", values: [true, true, true] },
      { label: "Easy to read on a small screen", values: [false, true, true] },
      { label: "Change a price or mark a dish sold out instantly", values: [false, true, true] },
      { label: "Guests place the order from the table", values: [false, false, true] },
      { label: "Order reaches the kitchen as a KOT with the table number", values: [false, false, true] },
      { label: "Guests pay by UPI, card or wallet at the table", values: [false, false, true] },
      { label: "GST bill made automatically", values: [false, false, true] },
    ],
    note: "Our free generator makes a view-only digital menu. When you want ordering, OQwik takes over.",
  },

  steps: {
    eyebrow: "How it works",
    title: "From scan to kitchen in four steps",
    items: [
      { title: "We set up your menu", body: "Our team adds your dishes, prices, photos and veg / non-veg marks, and prints a QR code for every table." },
      { title: "The guest scans the table QR", body: "The phone camera opens your menu in the browser. No app, no sign-up, no waiting for a menu card." },
      { title: "They order and pay", body: "Guests add dishes, write notes like “less spicy”, and pay by UPI, card, net banking or wallet." },
      { title: "The kitchen gets a KOT", body: "The order appears on the kitchen board and prints as a KOT, tagged with the table number. The GST bill is ready." },
    ],
  },

  tips: {
    eyebrow: "QR code design for restaurant tables",
    title: "Small details that make guests actually scan",
    items: [
      { title: "Print it big enough", body: "At least 4 cm across for a code read from the table, and larger if it holds a long menu." },
      { title: "Dark on light", body: "Black or deep blue on white scans best. Avoid light codes on dark backgrounds and glossy glare." },
      { title: "Say what it does", body: "“Scan to see the menu” or “Scan to order” right above the code. People scan when they know why." },
      { title: "One code per table", body: "For ordering, each table needs its own code, so the kitchen knows where every order goes." },
      { title: "Laminate it", body: "Table cards get wiped down and splashed. A laminated or acrylic stand keeps the code readable." },
      { title: "Test on two phones", body: "Scan once with an Android phone and once with an iPhone, from where a guest sits, before you print all of them." },
    ],
  },

  faq: {
    title: "QR code menu questions",
    items: [
      {
        q: "Is a QR code menu free?",
        a: "A view-only QR menu can be free: our free QR menu generator makes one in a few minutes without sign-up. A QR menu that takes orders and payments, like OQwik, is a monthly plan quoted for your outlet, with the first 15 days free.",
      },
      {
        q: "Do guests need to download an app to use a QR menu?",
        a: "No. Guests point their phone camera at the QR code and the menu opens in the browser. Almost every Android phone and iPhone can do this without any extra app.",
      },
      {
        q: "Can I use my PhonePe, Paytm or Google Pay QR as a menu?",
        a: "No. A PhonePe, Paytm or Google Pay QR only collects money. It doesn’t show your menu or tell the kitchen what to cook. A QR ordering menu like OQwik shows the menu, takes the order and collects the payment in one scan.",
      },
      {
        q: "How do I change prices on a QR code menu?",
        a: "With OQwik you change the price in your dashboard and guests see it on their next scan. The printed QR codes stay the same. With the free generator, the menu is stored inside the code, so a new price means printing a new code.",
      },
      {
        q: "What about guests who don’t want to scan?",
        a: "Staff can take their order the old way and punch it in at the counter. It joins the same kitchen board and bill, so every order runs through one system.",
      },
      {
        q: "Does a QR menu work for small cafes and dhabas?",
        a: "Yes. A QR menu suits any place where guests sit at a table: cafes, dhabas, family restaurants, food courts and QSRs. Fewer staff trips to tables matters most where the team is small.",
      },
    ],
  },

  closing: {
    title: "Start with a free QR menu, or go straight to ordering",
    body: "Make a view-only menu yourself in minutes, or let our team set up QR ordering, KOT and GST billing for your tables.",
  },
};

export const generatorPage = {
  title: "Free QR Code Generator for Restaurant Menus",
  description:
    "Create a QR code for your restaurant menu free. Type your dishes or turn a PDF menu into a QR code, then download it or print table cards. No sign-up.",
  eyebrow: "Free tool · No sign-up",
  h1: "Free QR code generator for your menu",
  lead: "Create a QR code for your menu for free: type or paste your dishes, or use the link to your PDF menu. Check how guests will see it on a phone, then download the QR code or print table cards. Nothing to install, no account.",
  points: ["Veg / non-veg marks", "Half and full prices", "PDF to QR code", "Print-ready A4 table cards"],

  how: {
    eyebrow: "How to make a QR code menu",
    title: "Three steps, about five minutes",
    items: [
      { title: "Add your dishes", body: "Type them in, or paste your menu from WhatsApp or a document: one dish per line with the price at the end." },
      { title: "Check the guest view", body: "See exactly what guests see on their phone. Mark veg and non-veg, and add a short note under your name." },
      { title: "Download or print the QR code", body: "Save the QR code as a PNG for your designer, or print an A4 sheet of four table cards and cut along the lines." },
    ],
  },

  pdf: {
    eyebrow: "PDF to QR code",
    title: "Already have a PDF menu? Turn it into a QR code",
    intro: "If your menu is already designed as a PDF, you don’t need to type it again. Put the PDF online and make a QR code that opens it.",
    steps: [
      { title: "Upload the PDF", body: "Put your menu PDF on Google Drive, Dropbox or your website." },
      { title: "Share it publicly", body: "On Google Drive, set sharing to “Anyone with the link”. Otherwise guests see a sign-in page." },
      { title: "Paste the link", body: "Choose “PDF or menu link” in the generator above and paste the link." },
      { title: "Print the QR code", body: "Download the QR code or print the table cards. Scan one yourself before printing the rest." },
    ],
    note: "A PDF is hard to read on a phone and has to be uploaded again for every price change. A typed menu reads better on small screens.",
  },

  faq: {
    title: "Questions about the free QR menu",
    items: [
      {
        q: "Is this QR code generator really free?",
        a: "Yes. No sign-up, no trial period and no payment. The menu shows a small “Free QR menu by OQwik” line at the bottom.",
      },
      {
        q: "Where is my menu stored?",
        a: "Inside the QR code’s link itself, compressed. It isn’t saved on our servers and we never see it. Your draft is also kept in this browser, so you can come back and edit it.",
      },
      {
        q: "Will my QR code menu expire?",
        a: "No. There is no subscription behind it. The dishes and prices travel inside the code, and it opens on oqwik.in.",
      },
      {
        q: "How do I update a price?",
        a: "Open this page in the same browser, change the price and print the new code. Because the menu lives inside the code, the old code keeps showing the old price.",
      },
      {
        q: "How many dishes can one QR code hold?",
        a: "Around 50 to 60 dishes without descriptions. The density meter tells you when the code is getting too detailed to scan easily; shorter descriptions make room for more dishes.",
      },
      {
        q: "How do I turn a PDF menu into a QR code?",
        a: "Upload the PDF to Google Drive, Dropbox or your website, choose “PDF or menu link” and paste the link. On Google Drive, set sharing to “Anyone with the link”, or guests will be asked to sign in.",
      },
      {
        q: "Can I make a QR code for other links, like my Google review page?",
        a: "Yes. “PDF or menu link” makes a free QR code for any public web link, such as your Google review page or Instagram. The table card says “Scan to see our menu”, so use the plain PNG download for other links.",
      },
      {
        q: "Can guests order from this free QR menu?",
        a: "No, it’s for reading the menu. If you want guests to order and pay from the table, with a KOT in the kitchen and a GST bill, that’s what OQwik does.",
      },
    ],
  },
};
