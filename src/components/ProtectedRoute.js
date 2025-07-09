// app/components/ProtectedRoute.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "./auth"; // Your own auth check function

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth()
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        setIsAuthenticated(false);
        router.replace("/auth"); // Redirect if unauthenticated
      });
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
