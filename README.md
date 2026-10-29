# MediCare: Hospital Appointment Booking (MERN)

MediCare lets patients find a doctor, book an appointment and pay online. Doctors manage their own appointments and profile. Admins manage doctors, services and every booking.

> All data in this repository is sample data. No real patient, doctor or payment information is included.

## At a glance

|          |                                                                        |
| -------- | ---------------------------------------------------------------------- |
| Type     | Full-stack MERN (MongoDB, Express, React, Node.js)                     |
| Apps     | Patient site with doctor portal, admin panel, REST API                 |
| API      | 35 endpoints, 4 database collections                                   |
| Auth     | Clerk for patients and admins, email and password with JWT for doctors |
| Payments | Stripe Checkout, confirmed by a signed webhook                         |

## Features

- **Patients:** browse doctors and services, book an appointment, pay online or choose cash, see their own bookings.
- **Doctors:** see and update only their own appointments, reschedule, edit their profile, switch availability on or off.
- **Admins:** add and remove doctors and services, see every appointment, cancel or override a status, view statistics.

## Stack

React 19, Vite, React Router, Tailwind CSS, Clerk, Node.js, Express 5, MongoDB with Mongoose, JWT, bcrypt, Stripe, Cloudinary, Nodemailer. Redis is optional (shared rate limits).

## How the pieces fit together

```
Patient site + Doctor portal (frontend)     Admin panel (admin)
              \                                  /
               Express REST API (backend): auth checks, validation, pricing, business rules
              /          |            |            \
          Clerk      MongoDB       Stripe     Cloudinary / SMTP
```

The frontends never touch the database. They only call the API, and the API decides who may do what.

## Booking and payment flow

1. The patient signs in with Clerk and chooses a doctor, a date and a time.
2. The frontend sends the booking to `POST /api/appointments`. It sends **no price**.
3. The server checks the login, rejects a repeat booking of the same slot by the same patient (409), and takes the fee from the doctor record.
4. Fee of 0: confirmed. Cash: saved as Pending. Online: a Stripe Checkout Session is created and its URL is returned.
5. After paying, the patient returns to `/appointment/success`. The server asks Stripe whether that session is paid and marks the appointment Confirmed.
6. Separately, Stripe calls `POST /api/webhooks/stripe`. The server verifies Stripe's signature on the raw body and marks the same appointment paid, so the payment is recorded even if the patient closes the tab.

## Roles and authentication

| Role    | Signs in with                                  | Enforced by                                                              |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| Patient | Clerk                                          | Clerk session read on the server; bookings are tied to the Clerk user id |
| Doctor  | Email and password, then a JWT (7 days)        | `doctorAuth` middleware plus an ownership check on every record          |
| Admin   | Clerk, and the account must be on an allowlist | `adminAuth` middleware checking `ADMIN_CLERK_USER_IDS`                   |

Every permission is checked on the server, not only hidden in the interface.

## Security decisions

- **Price comes from the server.** A client cannot change what it pays.
- **Signed Stripe webhook on the raw body.** Only Stripe can mark a payment as paid.
- **Ownership checks (IDOR protection).** A doctor reads and updates only their own appointments; a patient sees only their own bookings.
- **JWT revocation with `tokenVersion`.** Logging out everywhere or resetting a password invalidates older tokens.
- **Safe password reset.** The answer is the same whether or not the email exists, and the token is short-lived (15 minutes) and cannot be reused.
- **Passwords** are hashed with bcrypt and excluded from the public doctors list.
- **Rate limiting.** General API 300 requests per 15 minutes; login and forgot-password 10 per 15 minutes; booking 20 per hour.
- **Input and transport hardening.** NoSQL-injection stripping, CORS allowlist, security headers, 1 MB body limit, invalid ids return 400.

## Design decision: one slot, many patients

Several patients can book the same time slot on purpose. In a hospital, patients arrive when the doctor's session starts and the doctor sees them one by one, so a slot works like a session, not a single seat. A patient still cannot book the same doctor, date and time twice.

Trade-off: nothing limits how many patients book one slot, and there is no queue number. A planned next step is a maximum number of patients per slot and a token number given in booking order, so each patient knows their turn.

## Demo data and accounts

```bash
cd backend && node seed.js
```

This creates 20 sample doctors with bookable slots starting **tomorrow** (run it again to refresh the dates). All sample doctors share the password `Doctor@123`, for example `sarah.johnson@medicare.com`. This password is for local demos only. Never use it anywhere real.

Patients and admins sign in through Clerk, so you need your own Clerk application (free). Put your Clerk user id in `ADMIN_CLERK_USER_IDS` to open the admin panel. Use Stripe test mode and the test card `4242 4242 4242 4242`.

## Run locally

```bash
# 1. backend
cd backend && cp .env.example .env     # fill in your own values
npm install && npm run dev             # http://localhost:4000

# 2. patient site and doctor portal
cd frontend && cp .env.example .env && npm install && npm run dev

# 3. admin panel
cd admin && cp .env.example .env && npm install && npm run dev
```

## Bugs found and fixed during review

- **Password hashes exposed on a public endpoint.** The doctors list used `.aggregate()`, which ignores `select: false`. Fixed by excluding the field explicitly.
- **Infinite re-render loops.** A plain function in a `useEffect` dependency array made the effect run forever and flooded the API. Fixed with `useCallback`.
- **Route shadowing.** `GET /:id` was declared before `/me` and `/confirm`, so those requests were read as ids and failed. Fixed by reordering.
- **Hardcoded localhost URLs** in about 20 files would have broken any deployment. Replaced with an environment variable.

## Known gaps

- No automated frontend tests and no CI pipeline yet.
- No maximum number of patients per slot and no token numbers (see the design decision above).
- The Stripe SDK and the pinned Stripe API version are behind current releases.
- Styling is mid-migration: many components still read class names from a shared `dummyStyles.js`.
- The doctor token is kept in `localStorage`.

## Screenshots

Add images to a `docs/screenshots` folder and link them here.
