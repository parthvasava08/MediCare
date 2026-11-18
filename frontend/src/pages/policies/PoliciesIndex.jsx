import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { policyList, LAST_UPDATED } from "../../policies/policyList";

const PoliciesIndex = () => (
  <div className="font-serif">
    <Navbar />
    <div className="bg-linear-to-br from-emerald-50 via-white to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-green-500 text-white px-6 py-10 md:px-12 md:py-14 shadow-xl">
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck size={14} /> MediCare Healthcare
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              Hospital Policies
            </h1>
            <p className="mt-4 max-w-2xl text-emerald-50 leading-relaxed md:text-lg">
              How we protect your information, handle appointments and payments,
              and what you can expect from us.
            </p>
            <p className="mt-6 text-xs text-emerald-100">
              Last updated {LAST_UPDATED}
            </p>
          </div>
        </header>

        <main className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {policyList.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-300 transition-all"
            >
              <h2 className="text-lg font-semibold text-emerald-900">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {p.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:gap-2 transition-all">
                Read policy <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default PoliciesIndex;
