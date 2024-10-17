import { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar /> 
        {aToken ? (
          <Routes>
            {/* // Admin ROute */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllApointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
        ) : (
          // {/* Doctor Route */}
          <Routes>
            <Route path="/" element={<DoctorDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointment />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        )}
      </div>
    </div>
  ) : (
    <div className="">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
