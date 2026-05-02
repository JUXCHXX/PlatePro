import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Marketing from "./pages/Marketing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardEditor from "./pages/dashboard/DashboardEditor";
import DashboardMenu from "./pages/dashboard/DashboardMenu";
import DashboardOffers from "./pages/dashboard/DashboardOffers";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import PublicLanding from "./pages/PublicLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Marketing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="editor" element={<DashboardEditor />} />
            <Route path="menu" element={<DashboardMenu />} />
            <Route path="offers" element={<DashboardOffers />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="/r/:slug" element={<PublicLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
