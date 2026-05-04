import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { StickyNavbar } from "./components/Header.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { FooterWithLogo } from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <StickyNavbar />

          <App />

          <ToastContainer position="top-center" />
          <FooterWithLogo />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
