import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClubAdminDashboard from "./pages/clubAdmin/ClubAdminDashboard";
import ClubMamberDashboard from "./pages/clubMember/ClubMemberDashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Test from "./pages/clubMember/test";
import UniversityAdminDashboard from "./pages/universityAdmin/UniversityAdminDashboard";
import ClubExplore from "./pages/ClubExplore";

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
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
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
            path="/test"
            element={
              <PrivateRoute>
                <Test />
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
