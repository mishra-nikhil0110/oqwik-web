
export const legal = {
  brand: "OQwik",
  // CONFIRM: registered legal name of the company that runs OQwik,
  // e.g. "Example Technologies Private Limited". Shown as the operator.
  entityName: "",
  // CONFIRM: registered office address.
  registeredAddress: "",
  // CONFIRM: a monitored inbox, e.g. hello@ / privacy@ your domain.
  email: "",
  // Required by the IT Rules 2011 and the DPDP Act: someone who answers privacy complaints.
  grievanceOfficer: {
    name: "", // CONFIRM
    email: "", // CONFIRM (falls back to `email`, then WhatsApp)
  },
  // CONFIRM: city whose courts hear disputes (usually where the company is registered).
  jurisdictionCity: "Noida",
  effectiveDate: "24 November 2026",
  effectiveDateIso: "2026-11-24",
};

export const operatorName = legal.entityName || legal.brand;
export const grievanceEmail = legal.grievanceOfficer.email || legal.email;
