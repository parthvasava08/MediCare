import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Who we are",
    paragraphs: [
      "MediCare Healthcare (\u201cMediCare\u201d, \u201cwe\u201d, \u201cus\u201d) runs this website, the doctor portal and the admin panel used to book and manage hospital appointments. This policy explains how we handle personal information when you use them.",
    ],
  },
  {
    heading: "Information we collect",
    items: [
      "Patient booking details: name, mobile number, age, gender, and the doctor, service, date and time you choose.",
      "Account details: your sign-in is handled by our authentication provider, so we receive your account identifier and the basic profile it shares (such as name and email).",
      "Doctor details: professional profile, qualifications, schedule, and a work email. Doctor passwords are stored only as a one-way hash.",
      "Payment details: the amount, method (cash or online) and payment status. Card numbers are entered on the payment provider\u2019s page and are never stored by MediCare.",
      "Messages you send us through the contact form, including your name, email, phone number and the department you select.",
      "Technical data needed to run the service, such as security logs and a sign-in token kept in your browser for doctor sessions.",
    ],
  },
  {
    heading: "How we use your information",
    items: [
      "To book, confirm, reschedule and manage your appointments.",
      "To let the treating doctor see the appointments assigned to them.",
      "To process payments and record whether an appointment has been paid.",
      "To send service messages such as password-reset emails.",
      "To keep the system secure, prevent misuse and meet legal obligations.",
    ],
    paragraphs: [
      "We do not sell your personal information and we do not use it for third-party advertising.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      "We share information only with service providers that help us run the platform, and only as needed for their task:",
    ],
    items: [
      "Authentication provider (patient and admin sign-in).",
      "Payment provider (online card payments).",
      "Image hosting provider (doctor profile photos).",
      "Email delivery provider (service emails).",
      "Database and hosting providers that store the data.",
      "Authorities or courts, where the law requires it.",
    ],
  },
  {
    heading: "Who can see your data inside MediCare",
    items: [
      "You can see only your own bookings.",
      "A doctor can see and update only the appointments assigned to them.",
      "Authorised administrators can see all appointments in order to manage the hospital.",
      "Access is checked on our servers for every request, not only hidden in the interface.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Appointment records are kept as part of the hospital\u2019s record of care and are not deleted automatically. Contact messages and technical logs are kept only as long as needed to respond and keep the service safe. Where the law sets a minimum retention period for medical records, we follow it.",
    ],
  },
  {
    heading: "How we protect it",
    items: [
      "Passwords are hashed; sessions can be revoked, and password-reset links are short-lived and single use.",
      "Requests are rate-limited and validated, and traffic is protected in transit.",
      "No system is perfectly secure. If a breach affects your personal information we will act promptly and notify those affected as the law requires.",
    ],
  },
  {
    heading: "Your choices and rights",
    items: [
      "Ask to see the personal information we hold about you.",
      "Ask us to correct information that is wrong or incomplete.",
      "Ask us to delete information that we are not required to keep as a medical record.",
      "Withdraw consent for optional uses, such as health-tip emails, at any time.",
      "Contact us using the details below to make a request. We may need to verify your identity first.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "Appointments for a child must be booked by a parent or legal guardian, who is responsible for the information provided.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top shows when it last changed. Continued use of the service after an update means you accept the revised policy.",
    ],
  },
];

const PrivacyPolicy = () => (
  <PolicyLayout
    title="Privacy Policy"
    intro="How MediCare collects, uses, shares and protects your personal and health-related information."
    sections={sections}
  />
);

export default PrivacyPolicy;
