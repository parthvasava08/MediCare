import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Add = lazy(() => import("./pages/Add"));
const List = lazy(() => import("./pages/List"));
const Appointments = lazy(() => import("./pages/Appointments"));
const SerDashboard = lazy(() => import("./pages/SerDashboard"));
const AddSer = lazy(() => import("./pages/AddSer"));
const ListService = lazy(() => import("./pages/ListService"));
const ServiceAppointments = lazy(
  () => import("./pages/ServiceAppointments"),
);
import Hero from "./components/Hero";

function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        Loading…
      </div>
    );
  if (!isSignedIn)
    return (
      <div className="min-h-screen font-mono flex items-center justify-center bg-linear-to-b from-emerald-50 via-green-50 to-emerald-100 px-4">
        <div className="text-center">
          <p className="text-emerald-800 font-semibold text-lg sm:text-2xl mb-4 animate-fade-in">
            Please sign in to view this page
          </p>

          <div className="flex justify-center">
            <Link
              to="/"
              className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white shadow-sm
                       hover:bg-emerald-700 hover:shadow-md
                       transition-all duration-300 ease-in-out
                       animate-bounce-subtle"
            >
              HOME
            </Link>
          </div>
        </div>
      </div>
    );
  return children;
}

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-emerald-700">
          Loading…
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/h"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/add"
          element={
            <RequireAuth>
              <Add />
            </RequireAuth>
          }
        />
        <Route
          path="/list"
          element={
            <RequireAuth>
              <List />
            </RequireAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          }
        />
        <Route
          path="/service-dashboard"
          element={
            <RequireAuth>
              <SerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/add-service"
          element={
            <RequireAuth>
              <AddSer />
            </RequireAuth>
          }
        />
        <Route
          path="/list-service"
          element={
            <RequireAuth>
              <ListService />
            </RequireAuth>
          }
        />
        <Route
          path="/service-appointments"
          element={
            <RequireAuth>
              <ServiceAppointments />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
