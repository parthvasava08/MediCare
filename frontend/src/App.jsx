import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Contact = lazy(() => import("./pages/Contact"));
const Service = lazy(() => import("./pages/Service"));
const DoctorDetail = lazy(() => import("./pages/DoctorDetail"));
const ServiceDetailPage = lazy(
  () => import("./pages/ServiceDetailPage"),
);
const Appointments = lazy(() => import("./pages/Appointments"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword"),
);
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const DHome = lazy(() => import("./pages/DHome"));
const List = lazy(() => import("./pages/List"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

import { CircleChevronUp } from "lucide-react";
const VerifyPaymentPage = lazy(() => import("./pages/VerifyPaymentPage"));
const VerifyServicePaymentPage = lazy(
  () => import("./pages/VerifyServicePaymentPage"),
);

// Doctor portal guard. The doctor session is a JWT kept in localStorage; without
// a valid (present and unexpired) token every API call on these pages comes back
// "token missing" / 401. Send the visitor to the login page instead of showing
// a page full of errors.
const DOCTOR_TOKEN_KEY = "doctorToken_v1";
function hasValidDoctorToken() {
  try {
    const token = localStorage.getItem(DOCTOR_TOKEN_KEY);
    if (!token) return false;
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem(DOCTOR_TOKEN_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
function RequireDoctor({ children }) {
  return hasValidDoctorToken() ? (
    children
  ) : (
    <Navigate to="/doctor-admin/login" replace />
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed right-4 bottom-6 z-50 w-11 h-11 rounded-full flex items-center justify-center 
      bg-emerald-600 text-white shadow-lg transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      hover:scale-110 hover:shadow-xl`}
      title="Go to top"
    >
      <CircleChevronUp size={22} />
    </button>
  );
};

const App = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      <div className="overflow-x-hidden bg-white text-gray-900">
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                color: "#059669",
                fontSize: "0.95rem",
              }}
            >
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctor-admin/login" element={<Login />} />
            <Route
              path="/doctor-admin/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/doctor-admin/reset-password"
              element={<ResetPassword />}
            />

            <Route
              path="/appointment/success"
              element={<VerifyPaymentPage />}
            />
            <Route path="/appointment/cancel" element={<VerifyPaymentPage />} />

            <Route
              path="/service-appointment/success"
              element={<VerifyServicePaymentPage />}
            />
            <Route
              path="/service-appointment/cancel"
              element={<VerifyServicePaymentPage />}
            />

            <Route
              path="/doctor-admin/:id"
              element={
                <RequireDoctor>
                  <DHome />
                </RequireDoctor>
              }
            />
            <Route
              path="/doctor-admin/:id/appointments"
              element={
                <RequireDoctor>
                  <List />
                </RequireDoctor>
              }
            />
            <Route
              path="/doctor-admin/:id/profile/edit"
              element={
                <RequireDoctor>
                  <EditProfile />
                </RequireDoctor>
              }
            />
          </Routes>
        </Suspense>
      </div>

      <ScrollButton />
    </>
  );
};

export default App;
