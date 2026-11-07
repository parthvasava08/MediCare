import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Booking an appointment",
    items: [
      "Sign in, choose a doctor, date and time, and confirm your details.",
      "You cannot book the same doctor, date and time twice. A repeat attempt is rejected.",
      "A time slot works like a session: several patients may hold the same slot and the doctor sees them one by one. Please arrive at the start of the session.",
      "A booking is Confirmed when the fee is zero or the online payment succeeds. A cash booking stays Pending until you pay at the hospital.",
    ],
  },
  {
    heading: "Appointment statuses",
    items: [
      "Pending: booked, payment not yet received (for example cash on arrival).",
      "Confirmed: booked and paid, or no fee due.",
      "Rescheduled: the doctor moved your appointment to a new date or time.",
      "Completed: the consultation has taken place.",
      "Canceled: the appointment will not go ahead.",
      "Completed and canceled appointments are final and cannot be rescheduled or changed.",
    ],
  },
  {
    heading: "Rescheduling",
    items: [
      "A doctor may reschedule an appointment if their availability changes. The new date and time are shown in your appointments list.",
      "If the new time does not suit you, contact us as early as possible so we can find another slot or cancel.",
      "Please contact us at least 24 hours before your appointment if you need a different time.",
    ],
  },
  {
    heading: "Cancellation",
    items: [
      "To cancel, contact MediCare by phone or email with your name, mobile number, doctor and appointment date.",
      "We ask for at least 24 hours\u2019 notice so the slot can be offered to another patient.",
      "Hospital administrators and doctors may cancel an appointment in exceptional cases, such as a doctor\u2019s emergency or unavailability.",
      "If we cancel, you will not be charged. If you already paid online, see the Payment & Refund Policy.",
    ],
  },
  {
    heading: "Missed appointments",
    items: [
      "If you do not attend and do not tell us, the appointment may be marked Canceled.",
      "Online fees for a missed appointment are not automatically refunded. Refund requests are reviewed under the Payment & Refund Policy.",
      "Repeated missed appointments may limit your ability to book in future.",
    ],
  },
  {
    heading: "Arriving for your visit",
    items: [
      "Arrive 10 to 15 minutes early and bring a photo ID and any relevant reports or prescriptions.",
      "Clinic hours are Monday to Saturday, 9:00 AM to 6:00 PM.",
      "Waiting time can vary because doctors see patients in turn and urgent cases may be seen first.",
    ],
  },
  {
    heading: "Emergencies",
    paragraphs: [
      "Online booking is not for emergencies. If you or someone else needs urgent care, call your local emergency number or go straight to the nearest emergency department.",
    ],
  },
];

const AppointmentPolicy = () => (
  <PolicyLayout
    title="Appointment Policy"
    intro="How booking, rescheduling, cancellation and missed appointments work at MediCare."
    sections={sections}
  />
);

export default AppointmentPolicy;
