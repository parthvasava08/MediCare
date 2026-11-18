import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Not for emergencies",
    paragraphs: [
      "This website and its booking system are not designed for medical emergencies. If you think you or someone else is having an emergency, such as chest pain, severe bleeding, difficulty breathing, stroke symptoms or loss of consciousness, call your local emergency number or go to the nearest emergency department immediately. Do not wait for an online appointment.",
    ],
  },
  {
    heading: "General information only",
    paragraphs: [
      "Articles, service descriptions and doctor profiles are provided for general information. They are not a diagnosis, treatment plan or medical advice, and they do not create a doctor\u2013patient relationship on their own.",
    ],
  },
  {
    heading: "Talk to a doctor",
    paragraphs: [
      "Always ask a qualified doctor about your own symptoms, tests and treatment. Never ignore professional advice or delay seeking it because of something you read on this website.",
    ],
  },
  {
    heading: "Doctor profiles and results",
    items: [
      "Doctor details such as experience, qualifications, ratings and patient numbers are provided by or about the doctor and are shown for information.",
      "Individual results vary. No outcome is promised or guaranteed.",
    ],
  },
  {
    heading: "Tests and services",
    paragraphs: [
      "Test and service descriptions explain what is offered. Whether a test is right for you is a decision for you and your doctor.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "Links to other websites, including social media, are provided for convenience. We do not control and are not responsible for their content.",
    ],
  },
  {
    heading: "Accuracy",
    paragraphs: [
      "We work to keep information accurate and up to date, but we do not guarantee it is complete or error-free. Please confirm details with the hospital before relying on them.",
    ],
  },
];

const MedicalDisclaimer = () => (
  <PolicyLayout
    title="Medical Disclaimer"
    intro="This website gives general information and is not a substitute for professional medical care."
    sections={sections}
  />
);

export default MedicalDisclaimer;
