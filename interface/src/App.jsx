import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClubAdminDashboard from "./pages/clubAdmin/clubAdminDashboard";
import ClubMamberDashboard from "./pages/clubMember/clubMemberDashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

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
                  (auth.role === "Club Admin" ? (
                    <ClubAdminDashboard />
                  ) : (
                    <ClubMamberDashboard />
                  ))
                }
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
