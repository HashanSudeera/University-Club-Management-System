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
import ClubPage from './pages/ClubPage';
import Announcement from './pages/Announcement';
import AboutUs from "./pages/AboutUs/AboutUs";

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
          <Route path="/club" element={<ClubPage />} />
          <Route path="/announcement" element={<Announcement />}/>  
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
          <Route 
            path="/AboutUs" 
            element={<AboutUs />} 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
