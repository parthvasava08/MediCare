import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X, User as UserIcon, Key } from "lucide-react";

import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { navbarStyles } from "../assets/dummyStyles";

const STORAGE_KEY = "doctorToken_v1";

// FIX: the two "Doctor Dashboard" links used the literal URL
// "/doctor-admin/dashboard" instead of the doctor's real id, so React Router
// treated the word "dashboard" as the :id param and the backend tried to look
// up a doctor with that "id" (CastError). LoginPage only stores the raw JWT,
// so decode it here (base64, no verification needed - this is only for
// building a link; every real API call is still verified by doctorAuth).
function getDoctorIdFromToken() {
  try {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return null;
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    // An expired token is not a login: don't treat the doctor as signed in.
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) return null;
    return decoded?.id || null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      // true only for a present, decodable, unexpired doctor token
      return Boolean(getDoctorIdFromToken());
    } catch {
      return false;
    }
  });
  const [doctorId, setDoctorId] = useState(() => getDoctorIdFromToken());

  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const id = getDoctorIdFromToken();
        setIsDoctorLoggedIn(Boolean(id));
        setDoctorId(id);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];

  function doctorLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setIsDoctorLoggedIn(false);
    setDoctorId(null);
    navigate("/");
  }

  return (
    <>
      <div className={navbarStyles.navbarBorder} />

      <nav
        ref={navRef}
        className={`${navbarStyles.navbarContainer} ${
          showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        }`}
      >
        <div className={navbarStyles.contentWrapper}>
          <div className={navbarStyles.flexContainer}>
            {/* Logo */}
            <Link to="/" className={navbarStyles.logoLink}>
              <div className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImageWrapper}>
                  <img
                    src={logo}
                    alt="MediCare logo"
                    className={navbarStyles.logoImage}
                  />
                </div>
              </div>
              <div className={navbarStyles.logoTextContainer}>
                <h1 className={navbarStyles.logoTitle}>MediCare</h1>
                <p className={navbarStyles.logoSubtitle}>
                  Healthcare Solutions
                </p>
              </div>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`${navbarStyles.navItem} ${
                        isActive
                          ? navbarStyles.navItemActive
                          : navbarStyles.navItemInactive
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={navbarStyles.rightContainer}>
              <SignedOut>
                {isDoctorLoggedIn ? (
                  <>
                    <Link
                      to={doctorId ? `/doctor-admin/${doctorId}` : "/doctor-admin/login"}
                      className={navbarStyles.doctorAdminButton}
                    >
                      <UserIcon className={navbarStyles.doctorAdminIcon} />
                      <span className={navbarStyles.doctorAdminText}>
                        Doctor Dashboard
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        doctorLogout();
                        navigate("/doctor-admin/login");
                      }}
                      className={navbarStyles.loginButton}
                    >
                      <Key className={navbarStyles.loginIcon} />
                      Doctor Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/doctor-admin/login"
                    className={navbarStyles.doctorAdminButton}
                  >
                    <UserIcon className={navbarStyles.doctorAdminIcon} />
                    <span className={navbarStyles.doctorAdminText}>
                      Doctor Admin
                    </span>
                  </Link>
                )}

                <button
                  onClick={() => clerk.openSignIn()}
                  className={navbarStyles.loginButton}
                >
                  <Key className={navbarStyles.loginIcon} />
                  Patient Login
                </button>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={navbarStyles.mobileToggle}
                aria-expanded={isOpen}
                aria-label="Open menu"
              >
                {isOpen ? (
                  <X className={navbarStyles.toggleIcon} />
                ) : (
                  <Menu className={navbarStyles.toggleIcon} />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className={navbarStyles.mobileMenu}>
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`${navbarStyles.mobileMenuItem} ${
                      isActive
                        ? navbarStyles.mobileMenuItemActive
                        : navbarStyles.mobileMenuItemInactive
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <SignedOut>
                {isDoctorLoggedIn ? (
                  <>
                    <Link
                      to={doctorId ? `/doctor-admin/${doctorId}` : "/doctor-admin/login"}
                      onClick={() => setIsOpen(false)}
                      className={navbarStyles.mobileDoctorAdminButton}
                    >
                      Doctor Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        doctorLogout();
                        navigate("/doctor-admin/login");
                      }}
                      className={navbarStyles.mobileDoctorAdminButton}
                    >
                      Doctor Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/doctor-admin/login"
                    onClick={() => setIsOpen(false)}
                    className={navbarStyles.mobileDoctorAdminButton}
                  >
                    Doctor Admin
                  </Link>
                )}
                <div className={navbarStyles.mobileLoginContainer}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      clerk.openSignIn();
                    }}
                    className={navbarStyles.mobileLoginButton}
                  >
                    Patient Login
                  </button>
                </div>
              </SignedOut>
            </div>
          )}
        </div>

        <style>{navbarStyles.animationStyles}</style>
      </nav>
    </>
  );
}
