import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/Rightpanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import NotePad from "./components/common/NotePad.jsx";
import ProductsCarousel from "./components/common/ProductsCarousal.jsx";
import Tictactoe from "./pages/games/tictactoe/tictactoe.jsx";
import Snake from "./pages/games/snake/snake.jsx";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (authUser && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  if (!authUser && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
      {authUser !== null ? <Sidebar /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/games/tictactoe" element={<Tictactoe />} />
        <Route path="/games/snake" element={<Snake />} />
      </Routes>
      {authUser !== null ? (
        <div className="flex flex-col justify-between h-screen sticky top-0">
          <RightPanel />
          <ProductsCarousel />
        </div>
      ) : null}
      <Toaster />
      {authUser !== null ? <NotePad /> : null}
    </div>
  );
}

export default App;