// lib/legal/privacy.ts - Privacy Policy. Written for the Digital Personal Data
// Protection Act, 2023, the DPDP Rules, 2025 and the IT Act, 2000.
// CONFIRM with a lawyer before launch, and keep it true: if a new tool starts
// collecting data (analytics, CRM, SMS), add it under "Who we share it with".

import { legal, operatorName } from "./config";
import type { LegalDoc } from "./types";

export const privacyPolicy: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How OQwik collects, uses and protects personal data from restaurant owners, their staff and the guests who order through OQwik QR menus, under India's DPDP Act, 2023.",
  intro: `This policy explains what personal data ${operatorName} ("OQwik", "we", "us") collects when you visit this website, use OQwik to run your restaurant, or order at a restaurant that uses OQwik, and what we do with it.`,
  summary: [
    "We collect only what we need to set up your trial, run your restaurant's ordering and billing, and support you.",
    "Guests' card numbers, UPI PINs and banking passwords never reach us. Licensed payment partners handle them.",
    "We never sell personal data or use guests' orders to advertise to them.",
    "You can ask us to see, correct or delete your data at any time.",
  ],
  sections: [
    {
      id: "scope",
      title: "Who this policy covers",
      blocks: [
        { type: "p", text: "This policy applies to three groups of people:" },
        {
          type: "ul",
          items: [
            { term: "Visitors", text: "who browse this website or send us a free-trial request." },
            { term: "Restaurants", text: "the owners, managers and staff who use the OQwik dashboard, kitchen board and billing." },
            { term: "Guests", text: "who scan a table QR at a restaurant that uses OQwik, then order and pay." },
          ],
        },
        {
          type: "p",
          text: "For visitors and restaurants, OQwik decides how personal data is used, so we are the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (DPDP Act). For guests, the restaurant decides what it needs to take and serve your order, so the restaurant is the Data Fiduciary and OQwik processes that data on its behalf as a Data Processor. The restaurant's own privacy terms also apply to you.",
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        {
          type: "ul",
          items: [
            {
              term: "Trial requests:",
              text: "your name, mobile number, restaurant name, city, number of tables, and the WhatsApp messages you send us.",
            },
            {
              term: "Restaurant accounts:",
              text: "names, phone numbers and email addresses of owners and staff; business details such as address and GSTIN; your menu, prices and photos; and the bank details your payment partner needs to settle payments.",
            },
            {
              term: "Guest orders:",
              text: "table number, items ordered, notes such as \"less spicy\", order time, payment status and the payment reference. If a restaurant asks for your name or phone number (for example, to send your bill), we store that too.",
            },
            {
              term: "Technical data:",
              text: "IP address, device and browser type, pages viewed and error logs, used to keep the service secure and working.",
            },
          ],
        },
        {
          type: "p",
          text: "We do not collect or store full card numbers, CVVs, UPI PINs or net-banking passwords. Payments are processed by payment aggregators authorised by the Reserve Bank of India, under their own security standards.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How we use it",
      blocks: [
        {
          type: "ul",
          items: [
            "To reply to your trial request and set up your menu, table QR codes and staff accounts.",
            "To send each order to the right kitchen with its table number, take payment, print KOTs and create GST bills.",
            "To show restaurants their orders, sales and reports.",
            "To provide support, fix problems and keep the service secure, including detecting fraud and misuse.",
            "To send restaurants service messages about their account, invoices and changes to OQwik.",
            "To meet legal duties, such as keeping tax records and responding to lawful requests from authorities.",
          ],
        },
        {
          type: "p",
          text: "We process personal data with your consent, which you give when you send a trial request, create an account or place an order, or for the legitimate uses the DPDP Act allows, such as complying with law. Where we rely on consent, you can withdraw it at any time; this does not affect anything already done.",
        },
      ],
    },
    {
      id: "whatsapp",
      title: "Trial requests on WhatsApp",
      blocks: [
        {
          type: "p",
          text: "When you submit the free-trial form, your details open in WhatsApp as a message to our team, and a copy is sent to our servers so no request is lost. Messages on WhatsApp are also handled by WhatsApp (Meta) under its own terms and privacy policy. We use these details only to contact you about OQwik.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      blocks: [
        { type: "p", text: "We never sell personal data. We share it only with:" },
        {
          type: "ul",
          items: [
            { term: "The restaurant you order from,", text: "which receives your order and payment details to prepare and bill it." },
            { term: "Payment partners,", text: "to process payments, refunds and settlements." },
            {
              term: "Service providers",
              text: "who host our servers and store data, send messages, or help us provide support, under contracts that let them use the data only for our instructions.",
            },
            { term: "Authorities,", text: "when the law requires it, or to protect the rights and safety of our users and the public." },
            {
              term: "A buyer or successor,",
              text: "if OQwik is merged or sold, in which case this policy continues to protect your data.",
            },
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technology",
      blocks: [
        {
          type: "p",
          text: "We use only the cookies and browser storage needed to make the site and ordering work, such as keeping a guest's cart while they order. We do not use advertising cookies. If we add analytics or other non-essential cookies, we will update this policy and ask for consent where the law requires.",
        },
      ],
    },
    {
      id: "storage",
      // CONFIRM: these retention periods are commitments; match them to how long you really keep data.
      title: "Where data is stored and for how long",
      blocks: [
        {
          type: "p",
          text: "Data is stored on secure cloud servers. Some providers may store it outside India; any such transfer follows the DPDP Act and is never made to a country the Government of India has restricted.",
        },
        {
          type: "ul",
          items: [
            "Trial requests that do not become customers: up to 12 months, then deleted.",
            "Restaurant account data: for as long as the account is active, then deleted or anonymised within 90 days of closure, unless the restaurant asks for an export first.",
            "Orders, bills and payment records: for as long as GST, tax and accounting laws require.",
            "Security logs: up to one year, or longer where the DPDP Rules require it.",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      blocks: [
        {
          type: "p",
          text: "All traffic to OQwik is encrypted with HTTPS. Access to personal data is limited to people who need it to do their job, and accounts are protected by authentication. We take reasonable security practices under the IT Act, 2000 and the DPDP Rules. If a breach affects your personal data, we will inform you and the Data Protection Board of India as the law requires.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        { type: "p", text: "Under the DPDP Act you can:" },
        {
          type: "ul",
          items: [
            "Ask what personal data we hold about you and how it is used.",
            "Ask us to correct, complete, update or delete it.",
            "Withdraw consent you gave earlier.",
            "Nominate someone to exercise these rights if you die or become unable to.",
            "Raise a complaint with our Grievance Officer, and then with the Data Protection Board of India if you are not satisfied.",
          ],
        },
        {
          type: "p",
          text: "Guests: because the restaurant controls your order data, you can also contact the restaurant directly. If you contact us, we will pass your request to the restaurant and help it respond.",
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          type: "p",
          text: "OQwik accounts are for adults running a business. Guests under 18 should order with a parent or guardian. We do not knowingly collect data from children for tracking or advertising.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: `We will update this page when our practices change and show the new date at the top. If a change is significant, restaurants will hear from us before it takes effect. This version is effective from ${legal.effectiveDate}.`,
        },
      ],
    },
    {
      id: "contact",
      title: "Contact and Grievance Officer",
      blocks: [
        { type: "p", text: "For any question, request or complaint about your personal data, contact us:" },
        { type: "contact" },
      ],
    },
  ],
};
