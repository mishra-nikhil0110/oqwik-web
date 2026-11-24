
import { legal, operatorName } from "./config";
import type { LegalDoc } from "./types";

const courts = legal.jurisdictionCity
  ? `the courts at ${legal.jurisdictionCity}`
  : "the courts at the place of our registered office";

export const termsAndConditions: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms and Conditions",
  description:
    "The terms for using OQwik's QR ordering, KOT and billing software: the 15-day free trial, fees, payments, restaurant responsibilities and how disputes are handled.",
  intro: `These terms are an agreement between you and ${operatorName} ("OQwik", "we", "us") for using the OQwik website, the OQwik QR ordering, kitchen and billing software, and related services (together, the "Service"). By using the Service you agree to them.`,
  summary: [
    "Your first 15 days are free, with no card needed. After that you choose a monthly plan or stop.",
    "Your menu, prices, taxes and food are yours: you keep them accurate and lawful.",
    "Guest payments go through licensed payment partners and are settled to your bank account.",
    "Your restaurant's data stays yours, and you can ask for a copy at any time.",
  ],
  sections: [
    {
      id: "definitions",
      title: "Who's who",
      blocks: [
        {
          type: "ul",
          items: [
            { term: "Restaurant", text: "means the business (and its owners and staff) that signs up to use OQwik." },
            { term: "Guest", text: "means a person who scans a restaurant's table QR to view its menu, order or pay." },
            { term: "Account", text: "means the restaurant's OQwik dashboard and the staff logins created under it." },
          ],
        },
        {
          type: "p",
          text: "If you accept these terms on behalf of a business, you confirm that you are allowed to bind that business to them.",
        },
      ],
    },
    {
      id: "trial",
      title: "The 15-day free trial",
      blocks: [
        {
          type: "ul",
          items: [
            "The trial starts on the day your restaurant goes live on OQwik and lasts 15 days.",
            "It is free and needs no card. Nothing is charged automatically when it ends.",
            "One trial per outlet. We may decline or end a trial that is being misused.",
            "At the end of the trial you can move to a paid plan or stop. If you stop, your table QR codes stop taking orders.",
          ],
        },
      ],
    },
    {
      id: "accounts",
      title: "Your account",
      blocks: [
        {
          type: "p",
          text: "Give us accurate details and keep them up to date. Keep your logins private and remove staff access when someone leaves. You are responsible for everything done through your Account. Tell us straight away if you think someone has used it without permission.",
        },
      ],
    },
    {
      id: "restaurant-duties",
      title: "What restaurants are responsible for",
      blocks: [
        {
          type: "ul",
          items: [
            "Keeping your menu, prices, photos, veg and non-veg markers, and allergen information accurate.",
            "Setting the correct GST rate and GSTIN for your business, and filing your own tax returns. OQwik calculates taxes at the rates you set; it does not give tax advice.",
            "Holding the licences your business needs, including FSSAI registration, and following food safety and consumer protection laws.",
            "Preparing and serving the orders you accept, and handling guest complaints, cancellations and refunds fairly.",
            "Telling guests about any charges on the bill before they order. Service charges must be optional, as required by the Central Consumer Protection Authority.",
          ],
        },
      ],
    },
    {
      id: "payments",
      title: "Orders and guest payments",
      blocks: [
        {
          type: "p",
          text: "When a guest orders through OQwik, the contract for the food is between the guest and the restaurant. OQwik provides the technology that carries the order and payment.",
        },
        {
          type: "p",
          text: "Guest payments are processed by payment aggregators authorised by the Reserve Bank of India and settled to the restaurant's bank account on the aggregator's schedule. OQwik is not a bank and does not hold guest money. Payment-gateway fees, refunds and chargebacks follow the payment partner's terms.",
        },
      ],
    },
    {
      id: "fees",
      title: "Fees and billing",
      blocks: [
        {
          type: "p",
          text: "After the trial, fees are as agreed in your quote for each outlet. We invoice monthly with GST added. If an invoice stays unpaid for more than 15 days after its due date, we may pause the Service after giving you notice. We will tell you at least 30 days before any change to your fees.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Fair use",
      blocks: [
        { type: "p", text: "Do not use the Service to:" },
        {
          type: "ul",
          items: [
            "Break any law, or sell anything you are not licensed to sell.",
            "Upload content that is false, offensive, or that you do not have the rights to.",
            "Try to access other restaurants' data, break our security, or overload our systems.",
            "Copy, resell or reverse-engineer the Service.",
          ],
        },
      ],
    },
    {
      id: "your-data",
      title: "Your data and content",
      blocks: [
        {
          type: "p",
          text: "Your menu, photos, orders, guest data and reports belong to your restaurant. You give us permission to store and display them only to run the Service for you. We process guest data on your behalf and as described in our Privacy Policy. You can ask for an export of your data at any time, including within 90 days after you stop using OQwik.",
          link: { href: "/privacy-policy", label: "Read the Privacy Policy" },
        },
      ],
    },
    {
      id: "our-ip",
      title: "Our software and brand",
      blocks: [
        {
          type: "p",
          text: "OQwik, its software, design and logos belong to us. These terms give you a right to use the Service while your Account is active; they do not transfer any ownership.",
        },
      ],
    },
    {
      id: "availability",
      title: "Availability and support",
      blocks: [
        {
          type: "p",
          text: "We work to keep OQwik running and fast, and we help you during setup and on WhatsApp. The Service depends on internet connections, phones, printers and third-party services that we do not control, so we cannot promise it will never be interrupted. We try to schedule maintenance outside busy service hours.",
        },
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      blocks: [
        {
          type: "p",
          text: "OQwik connects to services run by others, such as payment gateways, WhatsApp and printers. Their own terms apply to your use of them, and we are not responsible for how they work.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limits on our liability",
      blocks: [
        {
          type: "p",
          text: "The Service is provided \"as is\". To the extent the law allows, we are not liable for indirect or consequential losses, such as lost profits, lost business or lost data. Our total liability for any claim is limited to the fees you paid us in the three months before the claim. Nothing in these terms limits liability that cannot be limited under Indian law.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          type: "p",
          text: "If someone makes a claim against us because of your menu, your food, your taxes or your breach of these terms, you will cover our reasonable costs of dealing with it.",
        },
      ],
    },
    {
      id: "termination",
      title: "Ending the agreement",
      blocks: [
        {
          type: "p",
          text: "You can stop using OQwik at any time; paid plans end at the close of the current billing month. We may suspend or close an Account that breaks these terms or the law, and where possible we will tell you first and give you time to fix it.",
        },
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        {
          type: "p",
          text: `These terms are governed by the laws of India. Please contact us first, and we will try to resolve any problem within 30 days. If we cannot, disputes will be decided by ${courts}.`,
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        {
          type: "p",
          text: `We may update these terms as OQwik grows. We will post the new version here, and tell restaurants about important changes at least 15 days before they apply. This version is effective from ${legal.effectiveDate}.`,
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [{ type: "p", text: "Questions about these terms? We're happy to explain them:" }, { type: "contact" }],
    },
  ],
};
