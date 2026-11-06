import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "By using the MediCare website, doctor portal or booking system you agree to these terms and to our other policies. If you do not agree, please do not use the service.",
    ],
  },
  {
    heading: "What the service does",
    paragraphs: [
      "MediCare lets patients find doctors and services, book appointments and pay online or choose to pay in cash. Doctors manage their own appointments and profile. Booking an appointment does not guarantee a particular clinical outcome or that a doctor will be available if circumstances change.",
    ],
  },
  {
    heading: "Your account and details",
    items: [
      "Give accurate and complete information when booking, including your name and mobile number.",
      "Keep your sign-in details private. You are responsible for activity under your account.",
      "Book only for yourself or for someone you are authorised to book for, such as a child or dependent.",
      "Tell us promptly if you think your account has been used without permission.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: ["You must not:"],
    items: [
      "Book appointments you do not intend to attend, or make repeated false bookings.",
      "Try to access another person\u2019s bookings, a doctor\u2019s records or the admin panel without permission.",
      "Interfere with or probe the security of the system, or use automated tools to overload it.",
      "Submit false, abusive or unlawful content through the contact form or profile fields.",
    ],
  },
  {
    heading: "Doctors on the platform",
    items: [
      "Doctors use the portal to manage their own appointments, schedule and profile.",
      "Doctors are responsible for the accuracy of their profile, qualifications and availability.",
      "Doctors must keep patient information confidential and use it only to provide care.",
      "A doctor\u2019s availability can be switched off at any time, and administrators may cancel or correct an appointment status where needed.",
    ],
  },
  {
    heading: "Fees and payments",
    paragraphs: [
      "The consultation fee is set by the doctor record on our server and shown at booking. You cannot change the price at checkout. Payment and refund terms are described in our Payment & Refund Policy.",
    ],
  },
  {
    heading: "Medical information",
    paragraphs: [
      "Content on this website is for general information only and is not medical advice. Please read our Medical Disclaimer. In an emergency, call your local emergency number or go to the nearest hospital.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The MediCare name, logo, text, images and design are owned by or licensed to MediCare. You may not copy or reuse them without written permission.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the extent the law allows, MediCare is not liable for indirect or consequential loss arising from use of the website, for temporary unavailability of the service, or for delays caused by events outside our reasonable control. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Suspension",
    paragraphs: [
      "We may suspend or restrict access if these terms are broken or if needed to protect patients, staff or the system.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Disputes are subject to the courts at Surat, Gujarat, unless the law provides otherwise.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may revise these terms. The date at the top shows the latest version. Continuing to use the service after a change means you accept it.",
    ],
  },
];

const TermsAndConditions = () => (
  <PolicyLayout
    title="Terms & Conditions"
    intro="The rules that apply when you use the MediCare website, doctor portal and appointment booking system."
    sections={sections}
  />
);

export default TermsAndConditions;
