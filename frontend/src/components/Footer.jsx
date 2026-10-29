import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  Stethoscope,
  Activity,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      color: "hover:text-blue-600",
      name: "Facebook",
      href: "https://www.facebook.com/",
    },
    {
      Icon: Twitter,
      color: "hover:text-blue-400",
      name: "Twitter",
      href: "https://www.linkedin.com/",
    },
    {
      Icon: Instagram,
      color: "hover:text-pink-600",
      name: "Instagram",
      href: "https://www.instagram.com/",
    },
    {
      Icon: Linkedin,
      color: "hover:text-blue-700",
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
    {
      Icon: Youtube,
      color: "hover:text-red-600",
      name: "YouTube",
      href: "https://www.youtube.com/",
    },
  ];

  return (
    <footer className="relative font-serif bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 border-t border-emerald-200 overflow-hidden">
      <div className="absolute top-5 right-5 animate-float hidden md:block">
        <Stethoscope className="w-8 h-8 text-emerald-600" />
      </div>

      <div
        className="absolute top-1/3 left-5 animate-float hidden md:block"
        style={{ animationDelay: "3s" }}
      >
        <Activity className="w-5 h-5 text-green-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mb-10 text-center lg:text-left">
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
            <div className="flex items-center space-x-5 mb-6 transform transition-transform duration-500">
              <div className="relative">
                <div className="relative w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 p-1 transform transition-transform duration-500">
                  <img
                    src={logo}
                    alt="MediCare Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold bg-linear-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent font-['Poppins'] tracking-tight">
                  MediCare
                </h2>
                <p className="text-emerald-600 font-serif text-xs md:text-sm font-semibold tracking-wide mt-1">
                  Healthcare Solutions
                </p>
              </div>
            </div>

            <p className="text-emerald-700 font-serif italic mb-5 leading-relaxed text-sm md:text-base font-light">
              Your trusted partner in healthcare innovation. We&rsquo;re
              committed to providing exceptional medical care with cutting-edge
              technology and compassionate service.
            </p>

            <div className="space-y-3 w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start space-x-4 text-emerald-700 hover:text-emerald-800 transition-all duration-300 group transform hover:translate-x-0 md:hover:translate-x-2">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium">+91 9876543210</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-emerald-700 hover:text-emerald-800 transition-all duration-300 group transform hover:translate-x-0 md:hover:translate-x-2">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium">
                  medicare.demo@example.com
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-emerald-700 hover:text-emerald-800 transition-all duration-300 group transform hover:translate-x-0 md:hover:translate-x-2">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium">Surat, Gujarat</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-6 relative inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="w-full">
                  <a
                    href={link.href}
                    className="flex items-center justify-center md:justify-start text-emerald-700 hover:text-emerald-800 transition-all duration-300 group text-sm md:text-base font-medium py-2 px-3 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-200"
                    aria-label={link.name}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <ArrowRight className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-6 relative inline-block">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="flex items-center justify-center md:justify-start text-emerald-700 hover:text-green-700 transition-all duration-300 group text-sm md:text-base font-medium py-2 px-3 rounded-lg hover:bg-green-50 border border-transparent hover:border-green-200"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-4">
              Stay Connected
            </h3>
            <p className="text-emerald-700 text-sm md:text-base mb-4 font-light text-center lg:text-left">
              Subscribe for health tips, medical updates, and wellness insights
              delivered to your inbox.
            </p>

            <div className="w-full max-w-md">
              <div className="flex flex-col gap-3 lg:hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-base text-emerald-800 bg-white border-2 border-emerald-200 rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-300 shadow-sm placeholder-emerald-400"
                  aria-label="Email"
                />
                <button className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>

              <div className="relative hidden lg:block">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 text-base text-emerald-800 bg-white border-2 border-emerald-200 rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-300 transform shadow-lg placeholder-emerald-400"
                  aria-label="Email"
                />
                <button className="absolute right-2 xl:px-2 top-2 bg-linear-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full cursor-pointer transition-all duration-300 transform flex items-center shadow-lg hover:shadow-xl">
                  <Send className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Subscribe</span>
                </button>
              </div>

              <div className="flex gap-3 justify-center lg:justify-start mt-6">
                {socialLinks.map(({ Icon, color, name, href }, index) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    aria-label={name}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-green-500 rounded-full transform scale-0 group-hover:scale-110 transition-transform duration-300 hidden lg:block" />
                    <Icon
                      className={`w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 p-2 text-emerald-700 cursor-pointer transform hover:scale-110 hover:rotate-6 transition-all duration-300 relative z-10 bg-white rounded-2xl shadow-lg border-2 border-emerald-100 ${color}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center gap-4 md:gap-6 border-t border-emerald-100 pt-6">
          <div className="text-emerald-700 text-sm md:text-base font-medium flex items-center gap-2">
            <span>© {currentYear} MediCare Healthcare.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
