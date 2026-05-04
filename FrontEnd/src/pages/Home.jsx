import React from "react";
import Hero from "../components/hero/Hero";
import How from "../components/How";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-3xl" />
    </div>
  );
  if (user?.role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <div>
      <Hero />
      <How />
    </div>
  );
};

export default Home;
