import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import KnowsCareerPage from "./pages/KnowsCareerPage";
import GeneralPredictPage from "./pages/GeneralPredictPage";
import HistoryPage from "./pages/HistoryPage";
import LandingPage from "./pages/LandingPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import DiscussionPage from "./pages/DiscussionPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/knows" element={<KnowsCareerPage />} />
        <Route path="/knows/:step" element={<KnowsCareerPage />} />
        <Route path="/predict" element={<GeneralPredictPage />} />
        <Route path="/predict/:step" element={<GeneralPredictPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/career/:id" element={<CareerDetailPage />} />
        <Route path="/discussion" element={<DiscussionPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/signon" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
