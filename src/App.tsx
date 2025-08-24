import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pharmacies from "./pages/Pharmacies";
import Telemedecine from "./pages/Telemedecine";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MedicationDetail from "./pages/MedicationDetail";
import PharmacyDetail from "./pages/PharmacyDetail";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import MapSearch from "./pages/MapSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="pharmacies" element={<Pharmacies />} />
              <Route path="pharmacy/:id" element={<PharmacyDetail />} />
              <Route path="medication/:id" element={<MedicationDetail />} />
              <Route path="reservation/:id" element={<Reservation />} />
              <Route path="telemedecine" element={<Telemedecine />} />
              <Route path="tracking" element={<Tracking />} />
              <Route path="map" element={<MapSearch />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
