import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClubAdminDashboard from "./pages/clubAdmin/ClubAdminDashboard";
import ClubMamberDashboard from "./pages/clubMember/ClubMemberDashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import UniversityAdminDashboard from "./pages/universityAdmin/UniversityAdminDashboard";
import ClubExplore from "./pages/ClubExplore";
import ClubPage from "./pages/ClubPage";
import Announcement from "./pages/Announcement";
import AboutUs from "./pages/AboutUs";
import UserProfile from "./pages/userProfile";
import EventCalendar from "./pages/EventCalendar";
import CreateEvent from "./pages/CreateEvent";
import ClubRegister from "./pages/ClubRegister";
import ClubadminRequest from "./pages/universityAdmin/ClubadminRequest";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/userprofile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
              }
          />

          <Route
            path="/club"
            element={
              <PrivateRoute>
                <ClubPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ClubadminRequest"
            element={
              <PrivateRoute>
                <ClubadminRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <PrivateRoute>
                <Announcement />
              </PrivateRoute>
            }
          />
          <Route
            path="/eventcalendar"
            element={
              <PrivateRoute>
                <EventCalendar />
              </PrivateRoute>
            }
          />

          <Route
            path="/AddEvent"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {(auth) =>
                  console.log(auth) ||
                  (auth.role === "Uni Admin" ? (
                    <UniversityAdminDashboard />
                  ) : auth.role === "Club Admin" ? (
                    <ClubAdminDashboard />
                  ) : (
                    <ClubMamberDashboard />
                  ))
                }
              </PrivateRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <ClubExplore />
              </PrivateRoute>
            }
          />
          <Route 
            path="/AboutUs" 
            element={
              <AboutUs />
            } 
          />
          <Route 
            path="/clubRegister" 
            element={
              <PrivateRoute>
              <ClubRegister />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
