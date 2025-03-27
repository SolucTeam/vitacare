
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Index from "./pages/Index";
import Search from "./pages/Search";
import DoctorProfile from "./pages/DoctorProfile";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import CreateProfile from "./pages/CreateProfile";
import Settings from "./pages/Settings";
import LanguageSelection from "./pages/LanguageSelection";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

// Import i18n
import "./i18n";

const queryClient = new QueryClient();

// Component to handle conditional rendering based on first visit
const AppRoutes = () => {
  const { isFirstVisit } = useLanguage();

  if (isFirstVisit) {
    return (
      <Routes>
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="*" element={<Navigate to="/language-selection" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/booking/:doctorId" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<PasswordRecovery />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/language-selection" element={<LanguageSelection />} />
          
          {/* Redirect /signup to /register for consistency */}
          <Route path="/signup" element={<Navigate to="/register" replace />} />
          
          {/* Add placeholders for routes mentioned in the navbar */}
          <Route path="/services" element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
