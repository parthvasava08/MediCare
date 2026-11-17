import PolicyLayout from "../../components/PolicyLayout";

const sections = [
  {
    heading: "Consultation fees",
    items: [
      "Each doctor\u2019s fee is shown before you confirm a booking.",
      "The fee is set by MediCare on the server. It cannot be changed from your device at checkout.",
      "A fee of zero confirms the appointment immediately.",
    ],
  },
  {
    heading: "Ways to pay",
    items: [
      "Online: pay by card through our secure payment provider. Card details are entered on the provider\u2019s page and never stored by MediCare.",
      "Cash: choose cash at booking and pay at the hospital. Your appointment stays Pending until payment is received.",
    ],
  },
  {
    heading: "Payment confirmation",
    items: [
      "After you pay online you return to the site and we confirm the payment with the provider.",
      "Payment is also confirmed by a signed notification from the provider, so it is recorded even if you close the page.",
      "Once paid, the appointment is marked Confirmed and the payment status shows Paid.",
    ],
  },
  {
    heading: "Failed or abandoned payments",
    items: [
      "If you cancel or leave the payment page, no charge is made and the appointment is not confirmed.",
      "If money is deducted but your appointment is not Confirmed, wait a few minutes and refresh your appointments. If it still shows unpaid, contact us with your payment reference.",
      "Amounts wrongly charged will be returned after verification.",
    ],
  },
  {
    heading: "When a refund may be given",
    items: [
      "The hospital or the doctor cancels your appointment and you paid online.",
      "You were charged more than once for the same appointment.",
      "You were charged but the booking could not be created.",
      "You cancel with at least 24 hours\u2019 notice, subject to review.",
    ],
  },
  {
    heading: "When a refund is not usually given",
    items: [
      "You missed the appointment without telling us.",
      "The consultation has already taken place (status Completed).",
      "You cancel less than 24 hours before the appointment, unless there are exceptional circumstances.",
    ],
  },
  {
    heading: "How to request a refund",
    items: [
      "Contact us by phone or email with your name, mobile number, doctor, appointment date and payment reference.",
      "Refunds are reviewed individually by the hospital team. We do not currently refund automatically.",
      "Approved online refunds go back to the original payment method. Your bank may take several working days to show it.",
      "Cash payments are refunded at the hospital where they were collected.",
    ],
  },
  {
    heading: "Receipts and billing questions",
    paragraphs: [
      "Ask us for a receipt for any payment made through MediCare. For a billing question or dispute, contact us before raising a dispute with your bank so we can help resolve it quickly.",
    ],
  },
];

const PaymentRefundPolicy = () => (
  <PolicyLayout
    title="Payment & Refund Policy"
    intro="How fees are charged, how online and cash payments work, and how to ask for a refund."
    sections={sections}
  />
);

export default PaymentRefundPolicy;
