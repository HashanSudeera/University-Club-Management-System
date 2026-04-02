import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useProfile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state!

  useEffect(() => {
    const fetchProfile = async () => {
      // If there's no token, stop loading and abort
      if (!auth?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/users/me", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });
        setProfile(res.data);
        setError(null); // Clear errors on success
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false); // Finished fetching (success or fail)
      }
    };

    fetchProfile();
  }, [auth?.accessToken]); // Depend specifically on the token

  return { profile, error, loading };
};