import mongoose from "mongoose";
import "dotenv/config";
import Service from "./models/Service.js";

const services = [
  {
    name: "Blood Sugar Test",
    shortDescription: "Fasting & post-meal glucose level check.",
    about:
      "Measures blood glucose levels to diagnose and monitor diabetes and prediabetes. Includes fasting blood sugar and HbA1c testing.",
    price: 150,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=bloodsugar&backgroundColor=d1fae5",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
      ],
      "2026-06-17": [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
      ],
      "2026-06-18": ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM"],
      "2026-06-19": ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      "2026-06-20": ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
    instructions: [
      "Fast for 8-12 hours before the test",
      "Drink only water during fasting period",
      "Avoid exercise before the test",
      "Bring previous reports if available",
    ],
  },
  {
    name: "Complete Blood Count (CBC)",
    shortDescription: "Full blood panel including RBC, WBC and platelets.",
    about:
      "A comprehensive blood test that evaluates overall health and detects disorders including anemia, infection, and many other diseases.",
    price: 200,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=cbc&backgroundColor=dbeafe",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": [
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "01:00 PM",
      ],
      "2026-06-17": ["08:00 AM", "09:30 AM", "11:00 AM", "01:00 PM"],
      "2026-06-18": ["08:00 AM", "10:00 AM", "12:00 PM"],
      "2026-06-19": ["08:00 AM", "09:00 AM", "11:00 AM"],
      "2026-06-20": ["08:00 AM", "10:00 AM", "12:00 PM"],
    },
    instructions: [
      "No special preparation needed",
      "Inform doctor about any medications",
      "Stay hydrated before the test",
    ],
  },
  {
    name: "X-Ray",
    shortDescription: "Digital X-ray for chest, bones and joints.",
    about:
      "High-resolution digital X-ray imaging for diagnosing fractures, infections, and other conditions in bones and organs.",
    price: 350,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=xray&backgroundColor=ede9fe",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": [
        "09:00 AM",
        "10:30 AM",
        "12:00 PM",
        "02:00 PM",
        "04:00 PM",
      ],
      "2026-06-17": ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
      "2026-06-18": ["09:00 AM", "11:00 AM", "02:00 PM"],
      "2026-06-19": ["09:00 AM", "12:00 PM", "03:00 PM"],
      "2026-06-20": ["09:00 AM", "11:00 AM"],
    },
    instructions: [
      "Remove all metal objects and jewelry",
      "Wear comfortable clothing",
      "Inform staff if you are pregnant",
    ],
  },
  {
    name: "Ultrasound Scan",
    shortDescription: "Abdominal, pelvic and pregnancy ultrasound.",
    about:
      "Non-invasive imaging using sound waves to examine internal organs including abdomen, pelvis, and fetal development.",
    price: 600,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=ultrasound&backgroundColor=fce7f3",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": ["10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM"],
      "2026-06-17": ["10:00 AM", "12:00 PM", "02:00 PM"],
      "2026-06-18": ["10:00 AM", "01:00 PM", "03:30 PM"],
      "2026-06-19": ["10:00 AM", "12:00 PM"],
      "2026-06-20": ["10:00 AM", "01:00 PM"],
    },
    instructions: [
      "Drink 4-6 glasses of water 1 hour before abdominal scan",
      "Do not urinate before the scan",
      "Fast for 4 hours before abdominal ultrasound",
    ],
  },
  {
    name: "ECG / EKG",
    shortDescription: "Heart rhythm and electrical activity test.",
    about:
      "Electrocardiogram records the electrical signals in the heart to detect heart problems including arrhythmias and heart attacks.",
    price: 300,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=ecg&backgroundColor=fee2e2",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
      ],
      "2026-06-17": ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
      "2026-06-18": ["09:00 AM", "11:00 AM", "02:00 PM"],
      "2026-06-19": ["09:00 AM", "10:30 AM", "02:00 PM"],
      "2026-06-20": ["09:00 AM", "11:00 AM"],
    },
    instructions: [
      "Avoid applying lotions or oils on skin before test",
      "Wear loose comfortable clothing",
      "Avoid caffeine before the test",
      "Relax and breathe normally during the test",
    ],
  },
  {
    name: "MRI Scan",
    shortDescription: "Detailed imaging of brain, spine and joints.",
    about:
      "Magnetic Resonance Imaging provides detailed images of organs and tissues without radiation, used for brain, spine, and joint diagnosis.",
    price: 3500,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=mri&backgroundColor=d1fae5",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
      "2026-06-17": ["09:00 AM", "11:00 AM", "02:00 PM"],
      "2026-06-18": ["10:00 AM", "01:00 PM"],
      "2026-06-19": ["09:00 AM", "12:00 PM"],
      "2026-06-20": ["10:00 AM", "02:00 PM"],
    },
    instructions: [
      "Remove all metal objects, jewelry and piercings",
      "Inform staff about any implants or pacemakers",
      "No special diet preparation needed",
      "You may need to hold your breath during the scan",
    ],
  },
  {
    name: "CT Scan",
    shortDescription: "Cross-sectional body imaging with high accuracy.",
    about:
      "Computed Tomography provides detailed cross-sectional images of the body to diagnose injuries, tumors, and internal bleeding.",
    price: 2500,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=ctscan&backgroundColor=dbeafe",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
      "2026-06-17": ["10:00 AM", "12:00 PM", "02:00 PM"],
      "2026-06-18": ["09:00 AM", "11:00 AM"],
      "2026-06-19": ["10:00 AM", "01:00 PM"],
      "2026-06-20": ["09:00 AM", "12:00 PM"],
    },
    instructions: [
      "Fast for 4 hours if contrast dye is needed",
      "Inform staff about kidney problems or allergies",
      "Remove all metal objects",
      "Inform staff if you are pregnant",
    ],
  },
  {
    name: "Thyroid Function Test",
    shortDescription: "TSH, T3 and T4 hormone level check.",
    about:
      "Tests to evaluate thyroid gland function by measuring TSH, T3, and T4 hormone levels to diagnose hypothyroidism and hyperthyroidism.",
    price: 400,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=thyroid&backgroundColor=ede9fe",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
      "2026-06-17": ["08:00 AM", "09:30 AM", "11:00 AM"],
      "2026-06-18": ["08:00 AM", "10:00 AM", "12:00 PM"],
      "2026-06-19": ["08:00 AM", "09:00 AM"],
      "2026-06-20": ["08:00 AM", "10:00 AM"],
    },
    instructions: [
      "Take the test in the morning",
      "Fast for 8 hours before the test",
      "Take thyroid medications after the test if prescribed",
    ],
  },
  {
    name: "Lipid Profile",
    shortDescription: "Cholesterol and triglyceride level test.",
    about:
      "Measures total cholesterol, LDL, HDL and triglycerides to assess cardiovascular risk and monitor heart health.",
    price: 250,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=lipid&backgroundColor=fce7f3",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": ["08:00 AM", "09:00 AM", "10:00 AM"],
      "2026-06-17": ["08:00 AM", "09:00 AM", "10:30 AM"],
      "2026-06-18": ["08:00 AM", "09:30 AM"],
      "2026-06-19": ["08:00 AM", "10:00 AM"],
      "2026-06-20": ["08:00 AM", "09:00 AM"],
    },
    instructions: [
      "Fast for 9-12 hours before the test",
      "Drink only water during fasting",
      "Avoid alcohol for 24 hours before test",
      "Avoid heavy exercise before the test",
    ],
  },
  {
    name: "Urine Routine Test",
    shortDescription: "Complete urine analysis for kidney and infection check.",
    about:
      "Comprehensive urine examination to detect kidney disease, urinary tract infections, diabetes, and other metabolic conditions.",
    price: 100,
    available: true,
    imageUrl:
      "https://api.dicebear.com/7.x/icons/svg?seed=urine&backgroundColor=fee2e2",
    dates: [
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
    ],
    slots: {
      "2026-06-16": [
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
      ],
      "2026-06-17": ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
      "2026-06-18": ["08:00 AM", "09:00 AM", "10:00 AM"],
      "2026-06-19": ["08:00 AM", "09:00 AM", "11:00 AM"],
      "2026-06-20": ["08:00 AM", "09:00 AM", "10:00 AM"],
    },
    instructions: [
      "Collect mid-stream urine sample",
      "Use the sterile container provided",
      "First morning sample is preferred",
      "Do not contaminate the sample",
    ],
  },
];

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" DB connected");

    await Service.deleteMany({});
    console.log("  Cleared existing services");

    await Service.insertMany(services);
    console.log(` Inserted ${services.length} services successfully`);

    await mongoose.disconnect();
    console.log(" Done! Go to localhost:5173/services to see them.");
    process.exit(0);
  } catch (err) {
    console.error(" Seed failed:", err.message);
    process.exit(1);
  }
}

seedServices();
