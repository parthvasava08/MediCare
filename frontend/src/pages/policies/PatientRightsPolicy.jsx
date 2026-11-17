import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Your rights as a patient",
    items: [
      "Respectful, courteous and non-discriminatory care, whatever your age, gender, religion, language or background.",
      "Privacy and confidentiality of your personal and medical information.",
      "Clear information about your doctor, the consultation fee and how payment works before you commit.",
      "To ask questions and to understand your condition and the options for treatment in plain language.",
      "To ask for a second opinion.",
      "To decline a treatment or investigation after being told of the consequences.",
      "To see and ask for correction of the personal information we hold about you.",
      "To raise a complaint and receive a response.",
    ],
  },
  {
    heading: "Your responsibilities",
    items: [
      "Give accurate and complete information about your health, medicines, allergies and previous treatment.",
      "Attend on time, or tell us as early as possible if you cannot attend.",
      "Treat doctors, nurses and staff with respect. Violence, threats or abuse will not be tolerated.",
      "Follow the treatment plan agreed with your doctor, or tell them if you cannot.",
      "Pay your fees as agreed.",
      "Keep your sign-in details private.",
    ],
  },
  {
    heading: "Confidentiality",
    items: [
      "Doctors and staff may use your information only to provide care and run the hospital.",
      "We will share your information with others only with your consent, when it is needed for your care, or when the law requires.",
      "For a child or a person who cannot decide for themselves, a parent or legal guardian may act on their behalf.",
    ],
  },
  {
    heading: "Informed consent",
    paragraphs: [
      "Your doctor will explain any procedure, its benefits and risks, and alternatives before it is carried out. Booking an appointment is not consent to a procedure.",
    ],
  },
  {
    heading: "Feedback and complaints",
    items: [
      "Contact us by phone, email or the contact form with your name, mobile number, doctor and a description of the problem.",
      "We will acknowledge your complaint promptly and aim to respond with the outcome within a reasonable time.",
      "Making a complaint will not affect the quality of care you receive.",
    ],
  },
];

const PatientRightsPolicy = () => (
  <PolicyLayout
    title="Patient Rights & Responsibilities"
    intro="What you can expect from MediCare, and what we ask of every patient and visitor."
    sections={sections}
  />
);

export default PatientRightsPolicy;
