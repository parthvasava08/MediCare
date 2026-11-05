import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CircleCheck,
  CalendarDays,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { policyList, LAST_UPDATED, CONTACT } from "../policies/policyList";

// Shared shell for every policy page. A page only supplies:
//   title, intro, sections: [{ heading, paragraphs?: string[], items?: string[] }]
const PolicyLayout = ({ title, intro, sections }) => {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState("section-1");

  const index = policyList.findIndex((p) => p.path === pathname);
  const prev = index > 0 ? policyList[index - 1] : null;
  const next =
    index >= 0 && index < policyList.length - 1 ? policyList[index + 1] : null;

  // Highlight the section currently being read in the "On this page" list.
  useEffect(() => {
    const els = sections
      .map((_, i) => document.getElementById(`section-${i + 1}`))
      .filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections, pathname]);

  const goTo = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="font-serif">
      <Navbar />

      <div className="bg-linear-to-br from-emerald-50 via-white to-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Hero */}
          <header className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-green-500 text-white px-6 py-10 md:px-12 md:py-14 shadow-xl">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <ShieldCheck size={14} /> MediCare Healthcare Policies
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-emerald-50 leading-relaxed md:text-lg">
                {intro}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs backdrop-blur">
                <CalendarDays size={14} /> Last updated {LAST_UPDATED}
              </div>
            </div>
          </header>

          {/* Mobile: other policies as scrollable chips */}
          <nav
            aria-label="All policies"
            className="lg:hidden mt-6 -mx-4 px-4 overflow-x-auto"
          >
            <ul className="flex gap-2 w-max pb-1">
              {policyList.map((p) => (
                <li key={p.path}>
                  <Link
                    to={p.path}
                    className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      p.path === pathname
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"
                    }`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-3">
                    On this page
                  </h2>
                  <ul className="space-y-0.5">
                    {sections.map((s, i) => {
                      const id = `section-${i + 1}`;
                      const active = activeId === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            onClick={(e) => goTo(e, id)}
                            className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                              active
                                ? "bg-emerald-50 text-emerald-800 font-semibold"
                                : "text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/60"
                            }`}
                          >
                            <span
                              className={`mt-0.5 text-xs tabular-nums ${active ? "text-emerald-600" : "text-gray-400"}`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{s.heading}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-3">
                    Other policies
                  </h2>
                  <ul className="space-y-0.5">
                    {policyList.map((p) => (
                      <li key={p.path}>
                        <Link
                          to={p.path}
                          aria-current={
                            p.path === pathname ? "page" : undefined
                          }
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                            p.path === pathname
                              ? "bg-emerald-600 text-white"
                              : "text-gray-600 hover:text-emerald-800 hover:bg-emerald-50"
                          }`}
                        >
                          {p.title}
                          <ArrowRight size={13} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Content */}
            <main className="min-w-0 space-y-5">
              {sections.map((s, i) => (
                <section
                  key={s.heading}
                  id={`section-${i + 1}`}
                  className="scroll-mt-24 rounded-2xl border border-emerald-100 bg-white p-6 md:p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
                      {i + 1}
                    </span>
                    <h2 className="text-lg md:text-xl font-semibold text-emerald-900">
                      {s.heading}
                    </h2>
                  </div>

                  {s.paragraphs?.map((t) => (
                    <p
                      key={t}
                      className="mb-4 last:mb-0 text-gray-600 leading-7"
                    >
                      {t}
                    </p>
                  ))}

                  {s.items && (
                    <ul className="space-y-3 mt-1">
                      {s.items.map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 text-gray-600 leading-7"
                        >
                          <CircleCheck
                            size={18}
                            className="mt-1.5 shrink-0 text-emerald-500"
                          />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Contact */}
              <section className="rounded-2xl bg-linear-to-br from-emerald-700 to-emerald-600 p-6 md:p-8 text-white shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold">
                  Questions about this policy?
                </h2>
                <p className="mt-1 text-sm text-emerald-100">
                  Our team is happy to help.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <p className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                    <Phone size={16} /> {CONTACT.phone}
                  </p>
                  <p className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm break-all">
                    <Mail size={16} className="shrink-0" /> {CONTACT.email}
                  </p>
                  <p className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                    <MapPin size={16} /> {CONTACT.address}
                  </p>
                  <p className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                    <Clock size={16} /> {CONTACT.hours}
                  </p>
                </div>
              </section>

              {/* Prev / next */}
              {(prev || next) && (
                <nav
                  aria-label="Policy navigation"
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {prev ? (
                    <Link
                      to={prev.path}
                      className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                    >
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <ArrowLeft size={14} /> Previous
                      </span>
                      <span className="mt-1 block font-semibold text-emerald-900 group-hover:text-emerald-700">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <Link
                      to={next.path}
                      className="group rounded-2xl border border-emerald-100 bg-white p-5 text-right shadow-sm transition hover:border-emerald-300 hover:shadow-md sm:col-start-2"
                    >
                      <span className="flex items-center justify-end gap-1 text-xs text-gray-500">
                        Next <ArrowRight size={14} />
                      </span>
                      <span className="mt-1 block font-semibold text-emerald-900 group-hover:text-emerald-700">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicyLayout;
