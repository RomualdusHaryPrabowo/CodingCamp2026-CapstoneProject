import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  Code,
  Brain,
  Server,
  TrendingUp,
  Headset,
  PlusCircle,
  Lock,
  Copyright,
  Clock,
  FileText,
  BarChart,
  X,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import { useAuth } from "@/contexts/AuthContext";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import { getAccuracyLabel } from "../utils/helpers";
import { Button } from "@/components/retroui/Button";
import Footer from "@/components/ui/Footer";
import { Empty } from "@/components/retroui/Empty";

const PROGRAMMING_LANGUAGES = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "C#",
  "PHP",
  "Ruby",
  "Swift",
  "Go",
  "Rust",
];
const HARD_SKILL_NAMES = [
  "Software Development Experience",
  "Database Management",
  "Networking Skills",
  "Web Development Experience",
];
const SOFT_SKILL_NAMES = [
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Adaptability",
  "Time Management",
];

const CAREER_PATHS = [
  "Software Development",
  "Data & AI",
  "Infrastructure & Security",
  "Management & Analysis",
  "Support & Design",
];

const CAREERS_MAP = {
  "software development": "software-engineering",
  "data & ai": "data-science-ai",
  "infrastructure & security": "infrastructure-security",
  "management & analysis": "management-analysis",
  "support & design": "support-design",
};

const CAREER_META = {
  "software development": {
    bgClass: "bg-[#FDE047]",
    svg: <Code className="w-8 h-8 text-black" />,
  },
  "data & ai": {
    bgClass: "bg-[#A7F3D0]",
    svg: <Brain className="w-8 h-8 text-black" />,
  },
  "infrastructure & security": {
    bgClass: "bg-[#A5F3FC]",
    svg: <Server className="w-8 h-8 text-black" />,
  },
  "management & analysis": {
    bgClass: "bg-[#E9D5FF]",
    svg: <TrendingUp className="w-8 h-8 text-black" />,
  },
  "support & design": {
    bgClass: "bg-[#FFD6E8]",
    svg: <Headset className="w-8 h-8 text-black" />,
  },
};

const getCareerMeta = (name) => {
  const normalized = (name || "").toLowerCase().trim();
  if (normalized.includes("software"))
    return CAREER_META["software development"];
  if (normalized.includes("data")) return CAREER_META["data & ai"];
  if (normalized.includes("infra"))
    return CAREER_META["infrastructure & security"];
  if (normalized.includes("manage") || normalized.includes("analys"))
    return CAREER_META["management & analysis"];
  if (normalized.includes("support") || normalized.includes("design"))
    return CAREER_META["support & design"];
  return {
    bgClass: "bg-[#E2E8F0]",
    svg: <PlusCircle className="w-8 h-8 text-black" />,
  };
};

const formatAnalysisText = (text) => {
  if (!text) return "";
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <strong key={idx} className="font-black text-black">
          {part}
        </strong>
      );
    }
    return part;
  });
};

export default function HistoryDashboard() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  
  const [searchParams, setSearchParams] = useSearchParams();
  const rawId = searchParams.get("id");
  const expandedId = rawId ? (isNaN(rawId) ? rawId : parseInt(rawId)) : null;
  const setExpandedId = (id) => {
    if (id) {
      setSearchParams({ id });
    } else {
      setSearchParams({});
    }
  };
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  
  const guestId = user?.email || "";

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      
      await Promise.resolve();

      if (!guestId) {
        if (active) setLoading(false);
        return;
      }

      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await axios.get(
          `${backendUrl}/api/v1/history?guest_id=${guestId}`,
        );
        if (active) {
          if (response.data && response.data.data) {
            setHistories(response.data.data);
          } else {
            setHistories([]);
          }
        }
      } catch (err) {
        console.error("Error fetching history:", err);
        if (active) {
          setError(
            "Gagal memuat riwayat rekomendasi. Silakan coba beberapa saat lagi.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, [guestId]);

  return (
    <>
      <DiagonalSvgBackground />

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-6 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:pt-16 xl:pb-6 xl:px-6 flex lg:items-center items-start justify-center relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0">
            {}
            <div className="hidden lg:block w-full lg:w-80 shrink-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)]">
              <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 lg:overflow-hidden lg:h-full">
                {}
                <div className="pt-4 px-4 pb-4 lg:pt-6 lg:px-6 lg:pb-0 flex flex-col shrink-0 select-none">
                  <div className="flex flex-row items-center justify-between lg:justify-start">
                    <h3 className="font-head font-bold text-lg lg:text-xl uppercase tracking-tight">
                      Riwayat Karier
                    </h3>
                  </div>
                  <div className="hidden lg:block h-[3px] w-full bg-black mt-4 mb-6" />

                  {}
                </div>

                {}
                <div className="flex flex-col flex-1 min-h-0 border-t-0 border-black bg-[#F8F5F1]">
                  {}
                  {!user || loading ? (
                    <div className="p-4 lg:px-6 flex-1 bg-[#F8F5F1]">
                      <p className="text-xs font-bold text-slate-500">
                        {loading ? "Memuat..." : "Belum masuk."}
                      </p>
                    </div>
                  ) : error ? (
                    <div className="flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 flex flex-col items-center justify-center gap-3">
                      <div className="p-3 border-2 border-red-500 bg-red-100 rounded text-center w-full">
                        <p className="text-xs font-bold text-red-600">
                          {error}
                        </p>
                      </div>
                    </div>
                  ) : histories.length === 0 ? (
                    <div className="flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 flex flex-col items-center justify-center gap-4 text-center">
                      <div className="w-14 h-14 rounded-full border-3 border-black bg-yellow-100 flex items-center justify-center">
                        <FileText className="text-black" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">
                          Belum ada riwayat
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          Mulai analisis karier Anda
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 lg:overflow-y-auto retro-scrollbar max-h-[60vh] lg:max-h-none overflow-y-auto bg-[#F8F5F1]">
                      {histories.map((history) => {
                        const meta = getCareerMeta(history.prediction_result);
                        const isSelected = expandedId === history.id;
                        return (
                          <div key={history.id} className="relative group">
                            <button
                              onClick={() => {
                                setExpandedId(isSelected ? null : history.id);
                              }}
                              className={`w-full flex items-center gap-3 p-3 border-2 border-black rounded transition-all duration-300 ease-out cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_black] ${
                                isSelected
                                  ? "bg-[#FDE047] shadow-[8px_8px_0_0_black] -translate-x-1 -translate-y-1 text-black font-bold relative z-10 active:translate-x-0 active:translate-y-0 active:shadow-none"
                                  : "bg-white text-text-secondary shadow-[4px_4px_0_0_black] translate-x-0 translate-y-0 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-full border-2 border-black ${meta.bgClass} flex items-center justify-center shrink-0`}
                              >
                                <div className="scale-75 flex items-center justify-center">
                                  {meta.svg}
                                </div>
                              </div>
                              <div className="text-left flex-1 min-w-0">
                                <div className="font-head text-xs uppercase tracking-tight leading-tight truncate">
                                  {history.prediction_result || "Unknown"}
                                </div>
                                <div className="text-[10px] text-slate-600 mt-1">
                                  {new Date(
                                    history.createdAt,
                                  ).toLocaleDateString("id-ID")}
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => setExpandedId(null)}
                              className="absolute top-2 right-2 w-5 h-5 bg-red-400 hover:bg-red-500 border border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_black] hover:shadow-[1px_1px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] opacity-0 group-hover:opacity-100"
                              title="Tutup"
                            >
                              <X
                                className="text-white flex items-center justify-center"
                                size={12}
                                strokeWidth={3}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {}
                  <div className="mt-auto pt-2 lg:pt-2 lg:pb-4 lg:px-6 shrink-0 border-t-4 lg:border-t-0 border-black bg-[#F8F5F1]">
                    {}
                    <div className="hidden lg:block h-[3px] w-full bg-black mb-4 shrink-0" />
                    <div className="border-t-4 lg:border-t-0 border-black pt-4 lg:pt-0 flex flex-row items-center justify-center gap-1.5 text-black select-none">
                      <Copyright className="w-3.5 h-3.5" strokeWidth={3} />
                      <p className="text-xs font-bold text-center font-head uppercase tracking-widest mt-0.5">
                        2026 MATCHSTEP AI
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="flex-1 min-w-0 flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-6 md:px-10 md:pt-8 md:pb-8 lg:pt-8 lg:pb-8 lg:h-[calc(100vh-5.5rem)] lg:overflow-y-auto [scrollbar-gutter:stable] retro-scrollbar text-left gap-6 xl:h-[calc(100vh-5.5rem)] lg:max-h-[640px]">
              {!user ? (
                <div className="h-full flex flex-col gap-6 animate-in fade-in duration-300">
                  {}
                  <button
                    onClick={() => setIsMobilePopupOpen(true)}
                    className="lg:hidden w-full mb-2 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
                  >
                    <span>Riwayat Karier</span>
                    <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                      Belum Masuk
                    </span>
                  </button>

                  <h2 className="text-3xl font-head uppercase tracking-tight font-black mb-4 text-center border-b-4 border-black pb-4 break-words [word-break:break-word] hyphens-auto">
                    Riwayat Analisis Karier
                  </h2>

                  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300">
                    <Lock className="w-12 h-12 mb-6 text-black" />
                    <h3 className="font-head text-2xl uppercase font-black mb-2 tracking-tight">
                      Akses Terkunci
                    </h3>
                    <p className="text-slate-700 font-bold max-w-md mb-6 text-sm">
                      Masuk terlebih dahulu untuk melihat riwayat, berkomentar,
                      dan berinteraksi dengan komunitas.
                    </p>
                    <Link
                      to="/signon"
                      state={{ from: "/history" }}
                      className="bg-[#FDE047] px-6 py-3 border-2 border-black rounded font-head font-bold uppercase text-black tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] transition-all text-xs"
                    >
                      Masuk Sekarang
                    </Link>
                  </div>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm font-bold text-slate-500">Memuat...</p>
                </div>
              ) : expandedId && histories.find((h) => h.id === expandedId) ? (
                (() => {
                  const history = histories.find((h) => h.id === expandedId);
                  return (
                    <div className="h-full flex flex-col gap-5 text-left pb-4 sm:pb-6 md:pb-10 animate-in fade-in duration-300">
                      {}
                      <button
                        onClick={() => setIsMobilePopupOpen(true)}
                        className="lg:hidden w-full mb-2 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
                      >
                        <span>Daftar Riwayat</span>
                        <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                          Lihat Semua
                        </span>
                      </button>

                      {}
                      <div className="lg:hidden border-b-4 border-black pb-4 mb-4 w-full select-none">
                        <h2 className="text-xl sm:text-2xl font-head uppercase tracking-tight text-left truncate">
                          Detail Riwayat
                        </h2>
                      </div>
                      {}
                      <div className="bg-[#A7F3D0] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] p-4 sm:p-8 w-full transition-shadow duration-300 hover:shadow-none">
                        <p className="text-sm font-bold text-black uppercase tracking-widest mb-2 border-b-4 border-black pb-2 inline-block">
                          Rekomendasi Karier AI
                        </p>
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-head font-black uppercase text-black mt-2 mb-6 break-words [word-break:break-word] hyphens-auto">
                          {history.prediction_result}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-6 border-t-4 border-black pt-6">
                          <div className="flex-1 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_black] transition-shadow duration-300 hover:shadow-none">
                            <p className="text-sm font-bold uppercase mb-1 border-b-2 border-black pb-1">
                              Skala Kecocokan
                            </p>
                            <p className="text-2xl font-black mt-2 uppercase tracking-tight">
                              {getAccuracyLabel(history.probability || 0)}
                            </p>
                          </div>
                          <div className="flex-1 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_black] transition-shadow duration-300 hover:shadow-none">
                            <p className="text-sm font-bold uppercase mb-1 border-b-2 border-black pb-1">
                              Status Analisis
                            </p>
                            <p className="text-3xl font-black text-green-600 mt-2">
                              Berhasil
                            </p>
                          </div>
                        </div>
                      </div>

                      {}
                      <div className="w-full bg-[#F8F5F1] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
                        <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
                          Perbandingan Skor Semua Jalur
                        </h3>
                        <div className="flex flex-col gap-4">
                          {CAREER_PATHS.map((career, idx) => {
                            const isMain =
                              history.prediction_result &&
                              history.prediction_result
                                .toLowerCase()
                                .includes(
                                  career
                                    .toLowerCase()
                                    .split(" ")[0]
                                    .toLowerCase(),
                                );
                            const prob = isMain
                              ? Math.round((history.probability || 0) * 100)
                              : Math.max(2, Math.round(Math.random() * 25 + 5));
                            return (
                              <div
                                key={idx}
                                className={`border-4 border-black p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 shadow-[4px_4px_0_0_black] hover:shadow-none ${
                                  isMain ? "bg-[#FDE047]" : "bg-white"
                                }`}
                              >
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg uppercase font-head tracking-tight">
                                    {career}{" "}
                                    {isMain && (
                                      <span className="ml-2 text-xs bg-black text-white px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0_0_black]">
                                        ⭐ Match
                                      </span>
                                    )}
                                  </h4>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 w-full mt-2 md:mt-0">
                                  <div className="flex-1 h-8 border-4 border-black bg-white w-full overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                                    <div
                                      className={`h-full border-r-4 border-black transition-all duration-1000 ease-out absolute top-0 left-0 ${
                                        isMain ? "bg-black" : "bg-slate-400"
                                      }`}
                                      style={{ width: `${prob}%` }}
                                    />
                                  </div>
                                  <p className="font-black sm:w-40 text-left sm:text-right text-sm uppercase leading-tight shrink-0">
                                    {isMain
                                      ? getAccuracyLabel(history.probability)
                                      : "Tidak Direkomendasikan"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {history.analisis_dinamis && (
                        <div className="w-full bg-[#E0E7FF] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
                          <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-4 border-b-4 border-black pb-2 flex items-center gap-2 select-none">
                            <Sparkles className="w-6 h-6 text-black fill-black shrink-0" strokeWidth={2.5} />
                            <span>Analisis & Rekomendasi AI</span>
                          </h3>
                          <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-text-primary">
                            {formatAnalysisText(history.analisis_dinamis)}
                          </div>
                        </div>
                      )}

                      {}
                      {Array.isArray(history.hard_skill) &&
                        history.hard_skill.length >= 10 && (
                          <div className="w-full bg-[#F8F5F1] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
                            <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
                              Programming Languages
                            </h3>
                            <div className="flex flex-col gap-4">
                              {history.hard_skill
                                .slice(0, 10)
                                .map((score, index) => {
                                  const skillName =
                                    PROGRAMMING_LANGUAGES[index] ||
                                    `Lang ${index + 1}`;
                                  const percent = (score / 10) * 100;
                                  const isHigh = score >= 7;
                                  return (
                                    <div
                                      key={index}
                                      className={`border-4 border-black p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 shadow-[4px_4px_0_0_black] hover:shadow-none ${
                                        isHigh ? "bg-[#93C5FD]" : "bg-white"
                                      }`}
                                    >
                                      <div className="flex-1">
                                        <h4 className="font-bold text-lg uppercase font-head tracking-tight">
                                          {skillName}{" "}
                                          {isHigh && (
                                            <span className="ml-2 text-xs bg-black text-white px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0_0_black]">
                                              ⭐ Strong
                                            </span>
                                          )}
                                        </h4>
                                      </div>
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 w-full mt-2 md:mt-0">
                                        <div className="flex-1 h-8 border-4 border-black bg-white w-full overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                                          <div
                                            className={`h-full border-r-4 border-black transition-all duration-1000 ease-out absolute top-0 left-0 ${
                                              isHigh
                                                ? "bg-blue-500"
                                                : "bg-slate-400"
                                            }`}
                                            style={{ width: `${percent}%` }}
                                          />
                                        </div>
                                        <p className="font-black sm:w-20 text-left sm:text-right text-sm uppercase leading-tight shrink-0">
                                          {score}/10
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                      {}
                      <div className="w-full bg-[#F8F5F1] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
                        <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
                          Hard Skills
                        </h3>
                        {Array.isArray(history.hard_skill) &&
                        history.hard_skill.length > 10 ? (
                          <div className="flex flex-col gap-4">
                            {history.hard_skill
                              .slice(10, 14)
                              .map((score, index) => {
                                const skillName =
                                  HARD_SKILL_NAMES[index] ||
                                  `Hard Skill ${index + 1}`;
                                const percent = (score / 10) * 100;
                                const isHigh = score >= 7;
                                return (
                                  <div
                                    key={index}
                                    className={`border-4 border-black p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 shadow-[4px_4px_0_0_black] hover:shadow-none ${
                                      isHigh ? "bg-[#FDBA74]" : "bg-white"
                                    }`}
                                  >
                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg uppercase font-head tracking-tight">
                                        {skillName}{" "}
                                        {isHigh && (
                                          <span className="ml-2 text-xs bg-black text-white px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0_0_black]">
                                            ⭐ Strong
                                          </span>
                                        )}
                                      </h4>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 w-full mt-2 md:mt-0">
                                      <div className="flex-1 h-8 border-4 border-black bg-white w-full overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                                        <div
                                          className={`h-full border-r-4 border-black transition-all duration-1000 ease-out absolute top-0 left-0 ${
                                            isHigh
                                              ? "bg-orange-400"
                                              : "bg-slate-400"
                                          }`}
                                          style={{ width: `${percent}%` }}
                                        />
                                      </div>
                                      <p className="font-black sm:w-20 text-left sm:text-right text-sm uppercase leading-tight shrink-0">
                                        {score}/10
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : (
                          <p className="text-xs text-text-muted font-bold py-4">
                            Data hard skill tidak tersedia.
                          </p>
                        )}
                      </div>

                      {}
                      <div className="w-full bg-[#F8F5F1] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
                        <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
                          Soft Skills
                        </h3>
                        {Array.isArray(history.soft_skill) &&
                        history.soft_skill.length > 0 ? (
                          <div className="flex flex-col gap-4">
                            {history.soft_skill.map((score, index) => {
                              const skillName =
                                SOFT_SKILL_NAMES[index] ||
                                `Soft Skill ${index + 1}`;
                              const percent = (score / 10) * 100;
                              const isHigh = score >= 7;
                              return (
                                <div
                                  key={index}
                                  className={`border-4 border-black p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 shadow-[4px_4px_0_0_black] hover:shadow-none ${
                                    isHigh ? "bg-[#86EFAC]" : "bg-white"
                                  }`}
                                >
                                  <div className="flex-1">
                                    <h4 className="font-bold text-lg uppercase font-head tracking-tight">
                                      {skillName}{" "}
                                      {isHigh && (
                                        <span className="ml-2 text-xs bg-black text-white px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0_0_black]">
                                          ⭐ Strong
                                        </span>
                                      )}
                                    </h4>
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 w-full mt-2 md:mt-0">
                                    <div className="flex-1 h-8 border-4 border-black bg-white w-full overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                                      <div
                                        className={`h-full border-r-4 border-black transition-all duration-1000 ease-out absolute top-0 left-0 ${
                                          isHigh
                                            ? "bg-green-400"
                                            : "bg-slate-400"
                                        }`}
                                        style={{ width: `${percent}%` }}
                                      />
                                    </div>
                                    <p className="font-black sm:w-20 text-left sm:text-right text-sm uppercase leading-tight shrink-0">
                                      {score}/10
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-text-muted font-bold py-4">
                            Data soft skill tidak tersedia.
                          </p>
                        )}
                      </div>

                      {}
                      <div className="mt-auto pt-6 pb-4 sm:pb-6 md:pb-10 flex flex-col sm:flex-row gap-4 w-full">
                        <Button
                          onClick={() => navigate("/")}
                          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-cyan-300 enabled:hover:!bg-cyan-400"
                        >
                          Kembali ke Menu
                        </Button>
                        <Button
                          onClick={() => {
                            const careerObj =
                              CAREERS_MAP[
                                history.prediction_result?.toLowerCase()
                              ];
                            if (careerObj) {
                              navigate(`/career/${careerObj}`);
                            } else {
                              navigate("/knows");
                            }
                          }}
                          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-purple-300 enabled:hover:!bg-purple-400"
                        >
                          Lihat Karier
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(
                              history.type === "GENERAL"
                                ? "/predict"
                                : "/knows",
                            )
                          }
                          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-rose-300 enabled:hover:!bg-rose-400"
                        >
                          Analisa Baru
                        </Button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="h-full flex flex-col animate-in fade-in duration-300">
                  {}
                  <button
                    onClick={() => setIsMobilePopupOpen(true)}
                    className="lg:hidden w-full mb-4 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
                  >
                    <span>Daftar Riwayat</span>
                    <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                      Pilih Riwayat
                    </span>
                  </button>

                  <div className="border-b-4 border-black pb-4 mb-4 w-full select-none">
                    <h2 className="text-2xl sm:text-3xl font-head uppercase tracking-tight text-left">
                      Riwayat Analisis Karier
                    </h2>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center">
                    <Empty className="w-full mt-4 lg:mt-3 py-6 md:py-8 lg:py-7 animate-in fade-in zoom-in-95 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer">
                      <Empty.Content>
                        <Empty.Icon className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-6 text-black mb-1 w-auto">
                          <Clock className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10" />
                          <FileText className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10" />
                          <BarChart className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10" />
                        </Empty.Icon>
                        <Empty.Title>Pilih Riwayat</Empty.Title>
                        <Empty.Separator className="w-48 h-[3px] mt-1 mb-2" />
                        <Empty.Description>
                          Pilih salah satu riwayat analisis dari daftar di
                          riwayat karier
                        </Empty.Description>
                      </Empty.Content>
                    </Empty>
                  </div>

                  {}
                  <div className="w-full mt-auto pt-6 pb-4 sm:pb-6 md:pb-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t-4 border-black pt-6 w-full">
                      <Button
                        onClick={() => navigate("/")}
                        className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-cyan-300 enabled:hover:!bg-cyan-400"
                      >
                        Kembali ke Menu
                      </Button>
                      <Button
                        onClick={() => navigate("/#pilihan-karier")}
                        className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-purple-300 enabled:hover:!bg-purple-400"
                      >
                        Lihat Karier
                      </Button>
                      <Button
                        onClick={() => navigate("/#pilihan-target")}
                        className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-rose-300 enabled:hover:!bg-rose-400"
                      >
                        Analisa Baru
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      {isMobilePopupOpen && (
        <div
          onClick={() => setIsMobilePopupOpen(false)}
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-sm w-full py-6 px-0 relative flex flex-col max-h-[80vh] animate-zoom-in text-left"
          >
            <button
              onClick={() => setIsMobilePopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black bg-rose-300 hover:bg-rose-400 shadow-[2px_2px_0_0_black] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0_0_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded cursor-pointer transition-all duration-150 text-black select-none"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-head font-bold text-xl uppercase tracking-tight mb-4 border-b-4 border-black pb-2 text-black mx-6">
              Riwayat Karier
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 retro-scrollbar">
              {!user || loading ? (
                <p className="text-xs font-bold text-slate-500">
                  {loading ? "Loading..." : "Sign in untuk lihat riwayat"}
                </p>
              ) : error ? (
                <div className="p-3 border-2 border-red-500 bg-red-100 rounded text-center">
                  <p className="text-xs font-bold text-red-600">{error}</p>
                </div>
              ) : histories.length === 0 ? (
                <p className="text-xs font-bold text-slate-500">
                  Belum ada riwayat.
                </p>
              ) : (
                <div className="space-y-4">
                  {histories.map((history) => {
                    const meta = getCareerMeta(history.prediction_result);
                    const isSelected = expandedId === history.id;
                    return (
                      <button
                        key={history.id}
                        onClick={() => {
                          setExpandedId(isSelected ? null : history.id);
                          setIsMobilePopupOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 border-2 border-black rounded transition-all duration-300 cursor-pointer shadow-[4px_4px_0_0_black] hover:shadow-none ${
                          isSelected
                            ? "bg-[#FDE047] text-black font-bold relative z-10"
                            : "bg-white text-text-secondary"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 border-black ${meta.bgClass} flex items-center justify-center shrink-0`}
                        >
                          <div className="scale-75 flex items-center justify-center">
                            {meta.svg}
                          </div>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-head text-xs uppercase tracking-tight leading-tight truncate">
                            {history.prediction_result || "Unknown"}
                          </div>
                          <div className="text-[10px] text-slate-600 mt-1">
                            {new Date(history.createdAt).toLocaleDateString(
                              "id-ID",
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {}
            <div className="mt-6 pt-4 border-t-4 border-black flex flex-row items-center justify-center gap-1.5 text-black select-none mx-6">
              <Copyright className="w-3.5 h-3.5" strokeWidth={3} />
              <p className="text-xs font-bold text-center font-head uppercase tracking-widest mt-0.5">
                2026 MATCHSTEP AI
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
