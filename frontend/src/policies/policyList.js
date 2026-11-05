// Single source of truth for every policy page: used by the layout sidebar,
// the policies index page, the footer links and the routes in App.jsx.
export const LAST_UPDATED = "October 29, 2026";

export const CONTACT = {
  phone: "+91 9876543210",
  email: "medicare.demo@example.com",
  address: "Adajan, Surat, Gujarat",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
};

export const policyList = [
  {
    path: "/policies/privacy",
    title: "Privacy Policy",
    summary:
      "What patient and doctor data we collect, why, and how it is protected.",
  },
  {
    path: "/policies/terms",
    title: "Terms & Conditions",
    summary: "The rules for using the MediCare website and booking system.",
  },
  {
    path: "/policies/appointments",
    title: "Appointment Policy",
    summary: "Booking, rescheduling, cancellation and missed appointments.",
  },
  {
    path: "/policies/payments-refunds",
    title: "Payment & Refund Policy",
    summary: "Online and cash payments, failed payments and refund requests.",
  },
  {
    path: "/policies/patient-rights",
    title: "Patient Rights & Responsibilities",
    summary: "What you can expect from us and what we ask of you.",
  },
  {
    path: "/policies/medical-disclaimer",
    title: "Medical Disclaimer",
    summary:
      "This website is not for emergencies or a substitute for medical advice.",
  },
];
