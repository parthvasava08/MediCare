import express from "express";
import Stripe from "stripe";
import { reconcileAppointmentFromSession } from "../controllers/appointmentController.js";
import { reconcileServiceAppointmentFromSession } from "../controllers/serviceAppointmentController.js";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = STRIPE_KEY
  ? new Stripe(STRIPE_KEY, { apiVersion: "2023-10-16" })
  : null;

const stripeWebhookRouter = express.Router();

stripeWebhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe) {
      console.error(
        "Stripe webhook received but STRIPE_SECRET_KEY is not configured.",
      );
      return res.status(500).send("Stripe not configured");
    }
    if (!WEBHOOK_SECRET) {
      console.error(
        "Stripe webhook received but STRIPE_WEBHOOK_SECRET is not configured. Refusing to process.",
      );
      return res.status(500).send("Webhook secret not configured");
    }

    const signature = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error(
        "Stripe webhook signature verification failed:",
        err.message,
      );
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
      ) {
        const session = event.data.object;

        if (session.payment_status !== "paid") {
          return res.json({ received: true, skipped: "not paid yet" });
        }

        const type = session.metadata?.type;
        let result = null;
        if (type === "serviceAppointment") {
          result = await reconcileServiceAppointmentFromSession(session);
        } else {
          result = await reconcileAppointmentFromSession(session);
        }

        if (!result) {
          console.warn(
            "Stripe webhook: could not match any appointment for session",
            session.id,
            "metadata:",
            session.metadata,
          );
        }
      }

      return res.json({ received: true });
    } catch (err) {
      console.error("Error processing Stripe webhook event:", err);
      return res.status(500).send("Webhook handler error");
    }
  },
);

export default stripeWebhookRouter;
