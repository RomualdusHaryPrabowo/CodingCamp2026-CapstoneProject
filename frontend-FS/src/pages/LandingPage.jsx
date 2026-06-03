"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import { Card } from "@/components/retroui/Card";
import { Carousel } from "@/components/retroui/Carousel";
import { Accordion } from "@/components/retroui/Accordion";
import Footer from "@/components/ui/Footer";
import {
  Compass,
  Target,
  ListChecks,
  Cpu,
  Database,
  Ghost,
  Code,
  Brain,
  Server,
  TrendingUp,
  Headset,
  Monitor,
  Users,
  Check,
} from "lucide-react";
import { fetchDiscussionStats } from "@/utils/discussionApi";

export default function LandingPage() {
  const [activeHash, setActiveHash] = useState("");
  const location = useLocation();

  const [typedCommand, setTypedCommand] = useState("");
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    let active = true;
    const command = "npm run analyze-skills";

    const runSequence = async () => {
      while (active) {
        setTerminalStep(0);
        setTypedCommand("");
        for (let i = 0; i <= command.length; i++) {
          if (!active) return;
          setTypedCommand(command.slice(0, i));
          await new Promise((resolve) =>
            setTimeout(resolve, 60 + Math.random() * 40),
          );
        }

        if (!active) return;
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!active) return;
        setTerminalStep(1);
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (!active) return;
        setTerminalStep(2);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!active) return;
        setTerminalStep(3);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!active) return;
        setTerminalStep(4);
        await new Promise((resolve) => setTimeout(resolve, 6000));

        if (!active) return;
        setTerminalStep(0);
        setTypedCommand("");
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    };

    runSequence();

    return () => {
      active = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (location.hash) {
      const hash = location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }

      const rafId = requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
        setActiveHash(hash);
      });

      const timer = setTimeout(() => {
        setActiveHash("");
      }, 1000);
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  const [stats, setStats] = useState({
    members: 0,
    topics: 0,
    solutions: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadStats = async () => {
      try {
        const res = await fetchDiscussionStats();
        if (active && res && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch discussion stats:", err);
      } finally {
        if (active) {
          setStatsLoading(false);
        }
      }
    };

    loadStats();

    const intervalId = setInterval(loadStats, 5000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  const formatStat = (num) => {
    if (typeof num !== "number") return num;
    if (num >= 1000) {
      const formatted = (num / 1000).toFixed(1);

      return `${formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted}K+`;
    }
    return `${num}+`;
  };

  return (
    <>
      <DiagonalSvgBackground />

      {}
      <div className="min-h-screen bg-transparent font-sans text-foreground pt-20 pb-16 px-6 md:px-12 xl:px-24 flex flex-col gap-16 relative z-10">
        {}
        <section
          id="beranda"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full"
        >
          {}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {}
            <div className="flex items-center gap-2.5 w-fit select-none bg-[#FDE047] border-2 border-black px-3.5 py-1.5 shadow-[3px_3px_0_0_black] hover:shadow-none transition-shadow duration-300 rounded mt-[-16px] mb-[-12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-black shrink-0"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
                <g
                  transform="translate(11 11) scale(0.025) translate(-256 -256)"
                  fill="currentColor"
                >
                  <polygon points="354.38,53.422 354.38,168.726 226.378,168.726 226.378,284.03 98.38,284.03 98.38,399.334 0,399.334 0,458.578 157.62,458.578 157.62,343.274 285.622,343.274 285.622,227.97 413.625,227.97 413.625,112.666 512,112.666 512,53.422" />
                </g>
              </svg>
              <span className="font-head text-xl uppercase tracking-wider font-black text-black">
                MATCHSTEP AI
              </span>
            </div>

            <h1 className="text-[1.35rem] min-[380px]:text-2xl sm:text-5xl lg:text-[3.25rem] font-head leading-[1.05] uppercase tracking-tight text-text-primary">
              TEMUKAN JALUR <br />
              <span className="bg-[#B79A72] text-[#F8F5F1] px-2 py-0.5 border-4 border-black rounded inline-block whitespace-nowrap my-3 sm:my-1 transform rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300">
                KARIER IT IDEALMU
              </span>{" "}
              <br />
              DENGAN NEURAL NET AI
            </h1>

            <p className="text-md md:text-lg font-semibold text-text-secondary max-w-xl leading-relaxed">
              Bandingkan profil hard-skill dan soft-skill kamu menggunakan model
              AI neural-network pintar kami. Temukan peran IT yang paling ideal
              dengan persentase kecocokan presisi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/#pilihan-target"
                className="px-8 py-4 bg-primary text-black font-head border-4 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none uppercase text-center text-lg tracking-wider"
              >
                Mulai Analisa Karier
              </Link>

              <Link
                to="/history"
                className="px-8 py-4 bg-white text-black font-head border-4 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none uppercase text-center text-lg tracking-wider"
              >
                Lihat Riwayat
              </Link>
            </div>
          </div>

          {}
          <div className="lg:col-span-5 w-full">
            <div className="border-4 border-black rounded bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 overflow-hidden">
              {}
              <div className="bg-[#1E1916] text-[#F8F5F1] px-4 py-3 border-b-4 border-black flex items-center justify-between font-head text-xs uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Monitor size={16} className="text-black" />
                  MATCHSTEPAI-inference-system
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-none border-2 border-white bg-red-500"></div>
                  <div className="w-3 h-3 rounded-none border-2 border-white bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-none border-2 border-white bg-green-500"></div>
                </div>
              </div>

              {}
              <div className="p-6 font-mono text-sm text-left bg-white text-[#1E1916] flex flex-col gap-4 h-[420px] sm:h-[380px] md:h-[360px] overflow-hidden">
                <style>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                  @keyframes scaleIn {
                    from { transform: scale(0.96); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                  @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                  }
                  @keyframes hoverEmpty {
                    0% {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                    50% {
                      opacity: 0.9;
                      transform: scale(1.01) translateY(-1px);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }
                  .hover-empty-badge:hover {
                    animation: hoverEmpty 0.4s ease-in-out;
                  }
                  .animate-marquee-right {
                    display: flex;
                    width: max-content;
                    animation: marquee-right 25s linear infinite;
                  }
                  .blink-caret {
                    animation: blink 1s step-end infinite;
                  }
                `}</style>
                <div>
                  <span className="text-green-600 font-bold">
                    user@MATCHSTEPAI:~$
                  </span>{" "}
                  <span>{typedCommand}</span>
                  {terminalStep === 0 && (
                    <span className="blink-caret font-bold inline-block w-2 bg-black ml-0.5 text-xs">
                      &nbsp;
                    </span>
                  )}
                </div>

                {terminalStep >= 2 && (
                  <div className="text-gray-500 transition-all duration-300">
                    &gt; Loading FastAPI model weights (MATCHSTEP-v2.h5)... OK
                    {terminalStep >= 3 && (
                      <>
                        <br />
                        &gt; Processing 14 Technical &amp; 5 Soft-Skills... OK
                      </>
                    )}
                  </div>
                )}

                {terminalStep >= 4 && (
                  <div className="border-2 border-black rounded p-4 bg-[#F8F5F1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-500 flex flex-col gap-2 transform origin-top animate-[scaleIn_0.3s_ease-out]">
                    <div className="font-head text-xs uppercase tracking-wide border-b-2 border-black pb-1 mb-1">
                      PREDICTION SCORE RESULT
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-xs sm:text-sm gap-1">
                      <span>1. SOFTWARE DEVELOPTMENT:</span>
                      <span className="text-green-600 shrink-0">
                        92.4% MATCH
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 text-xs sm:text-sm gap-1">
                      <span>2. DATA DAN AI:</span>
                      <span className="shrink-0">74.1% MATCH</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 text-xs sm:text-sm gap-1">
                      <span>3. INFRASTRUCTURE AND SECURITY:</span>
                      <span className="shrink-0">58.9% MATCH</span>
                    </div>
                  </div>
                )}

                {terminalStep >= 4 && (
                  <div className="text-gray-500 animate-pulse mt-auto">
                    ▉ Waiting for new user skill parameters...
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {}
        <section
          id="pilihan-target"
          className={`max-w-6xl mx-auto w-full flex flex-col gap-6 mt-8 scroll-mt-24 ${
            activeHash === "pilihan-target" ? "animate-bounce-attention" : ""
          }`}
        >
          <div className="flex flex-col gap-2 text-center mb-4">
            <h2 className="text-3xl font-head uppercase tracking-tight text-black">
              MULAI ANALISA KARIER IT LENGKAP
            </h2>
            <p className="text-md font-semibold text-text-subtle">
              Pilih metode analisa berdasarkan tingkat kesiapan dan kejelasan
              rencana karier Anda:
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 w-full">
            {}
            <Link
              to="/predict/step-1"
              className="flex-1 block group cursor-pointer outline-none"
            >
              <Card className="h-full border-4 border-black rounded bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none flex flex-col items-center text-center group-focus-visible:ring-4 group-focus-visible:ring-black">
                <div className="w-20 h-20 rounded-full border-4 border-black bg-[#A7F3D0] flex items-center justify-center mb-8 shadow-[4px_4px_0_0_black] transition-transform group-hover:scale-110 duration-300">
                  <Compass className="w-10 h-10 text-black" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-head font-black uppercase mb-4 text-black tracking-tight">
                  Belum Tahu Target Karier
                </h2>
                <div className="h-1 w-48 bg-black mb-6" />
                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed">
                  Eksplorasi potensi dan dapatkan rekomendasi karier terbaik
                  untuk Anda.
                </p>
              </Card>
            </Link>

            {}
            <Link
              to="/knows/step-1"
              className="flex-1 block group cursor-pointer outline-none"
            >
              <Card className="h-full border-4 border-black rounded bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none flex flex-col items-center text-center group-focus-visible:ring-4 group-focus-visible:ring-black">
                <div className="w-20 h-20 rounded-full border-4 border-black bg-[#FDE047] flex items-center justify-center mb-8 shadow-[4px_4px_0_0_black] transition-transform group-hover:scale-110 duration-300">
                  <Target className="w-10 h-10 text-black" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-head font-black uppercase mb-4 text-black tracking-tight">
                  Sudah Punya Target Karier
                </h2>
                <div className="h-1 w-48 bg-black mb-6" />
                <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed">
                  Validasi kesiapan Anda untuk role spesifik dan temukan gap
                  keahlian.
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {}
        <section
          id="pilihan-karier"
          className={`max-w-7xl mx-auto w-full flex flex-col gap-8 mt-8 scroll-mt-24 ${
            activeHash === "pilihan-karier" ? "animate-bounce-attention" : ""
          }`}
        >
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-head uppercase tracking-tight">
              PILIH JALUR KARIER KESUKAANMU
            </h2>
            <p className="text-md font-semibold text-text-subtle">
              Berikut adalah beberapa sub-bidang IT terpopuler yang dianalisa
              oleh model AI kami:
            </p>
          </div>

          {}
          <div className="w-full max-w-6xl mx-auto mt-4 px-4 sm:px-12 md:px-16 pb-12 overflow-visible">
            <Carousel
              opts={{
                align: "center",
                loop: false,
                slidesToScroll: 1,
                breakpoints: {
                  "(min-width: 640px)": { slidesToScroll: 2, align: "start" },
                  "(min-width: 1024px)": { slidesToScroll: 3, align: "start" },
                },
              }}
              className="w-full overflow-visible"
            >
              <Carousel.Content className="py-4 sm:pl-2">
                {[
                  {
                    id: "software-engineering",
                    title: "Software Engineering",
                    bgClass: "bg-[#FDE047]",
                    svg: <Code className="w-8 h-8 text-black" />,
                    description:
                      "Fokus pada database, server logic, API integration, dan kestabilan sistem data padding.",
                    tags: "Python, JS, SQL",
                  },
                  {
                    id: "data-science-ai",
                    title: "Data & AI",
                    bgClass: "bg-[#A7F3D0]",
                    svg: <Brain className="w-8 h-8 text-black" />,
                    description:
                      "Merancang visual interaktif, website Neo-Brutalist responsive, dan alur integrasi client-side.",
                    tags: "React, Vite, CSS",
                  },
                  {
                    id: "infrastructure-security",
                    title: "Infrastructure & Security",
                    bgClass: "bg-[#A5F3FC]",
                    svg: <Server className="w-8 h-8 text-black" />,
                    description:
                      "Membangun arsitektur CI/CD, mengotomatisasi server, memantau server lokal, dan cloud computing.",
                    tags: "Docker, Git, Bash",
                  },
                  {
                    id: "management-analysis",
                    title: "Manajemen & Analysis",
                    bgClass: "bg-[#E9D5FF]",
                    svg: <TrendingUp className="w-8 h-8 text-black" />,
                    description:
                      "Menganalisa data skala besar, membuat model statistik Keras/Tensorflow, dan visualisasi grafik.",
                    tags: "FastAPI, Python, R",
                  },
                  {
                    id: "support-design",
                    title: "Support & Design",
                    bgClass: "bg-[#FFD6E8]",
                    svg: <Headset className="w-8 h-8 text-black" />,
                    description:
                      "Membantu operasional IT, menyelesaikan masalah teknis, dan merancang antarmuka pengguna yang intuitif.",
                    tags: "Linux, Figma, Helpdesk",
                  },
                ].map((career, index) => (
                  <Carousel.Item
                    key={index}
                    className="basis-full sm:basis-1/2 lg:basis-1/3 pr-4 sm:pr-0 py-3"
                  >
                    <Link
                      to={`/career/${career.id}`}
                      className="block h-full cursor-pointer group"
                    >
                      <Card className="border-4 border-black rounded bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out group-hover:shadow-none text-left w-full h-full flex flex-col justify-between min-h-[320px]">
                        <div>
                          <div
                            className={`mb-4 w-14 h-14 rounded-full border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${career.bgClass} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                          >
                            {career.svg}
                          </div>
                          <h3 className="font-head text-lg uppercase mb-2 text-text-primary">
                            {career.title}
                          </h3>
                          <p className="text-sm font-semibold text-text-secondary mb-6 leading-relaxed">
                            {career.description}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <span className="inline-block bg-[#F5F0EA] border-2 border-black rounded px-3 py-1 font-mono text-xs font-bold text-text-primary">
                            {career.tags}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              {}
              <Carousel.Previous
                variant="secondary"
                className="top-auto -bottom-8 left-[calc(50%-2.75rem)] -translate-y-0 sm:top-1/2 sm:bottom-auto sm:-left-10 md:-left-12 sm:-translate-y-1/2"
              />
              <Carousel.Next
                variant="secondary"
                className="top-auto -bottom-8 right-[calc(50%-2.75rem)] -translate-y-0 sm:top-1/2 sm:bottom-auto sm:-right-10 md:-right-12 sm:-translate-y-1/2"
              />
            </Carousel>
          </div>
        </section>

        {}
        <section
          id="alur"
          className={`max-w-7xl mx-auto w-full flex flex-col gap-6 mt-12 scroll-mt-24 ${
            activeHash === "alur" ? "animate-bounce-attention" : ""
          }`}
        >
          <div className="flex flex-col gap-2 text-center mb-4">
            <h2 className="text-3xl font-head uppercase tracking-tight text-black">
              ALUR ANALISA MATCHSTEP
            </h2>
            <p className="text-md font-semibold text-text-subtle">
              Bagaimana model AI kami memproses dan menentukan persentase
              kecocokan karier Anda:
            </p>
          </div>

          <div className="border-4 border-black rounded bg-white py-8 md:py-12 px-8 md:px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-16 right-16 h-1 border-t-4 border-dashed border-black/20 z-0" />

              {}
              <div className="relative border-4 border-black bg-white rounded p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none group hover:bg-[#FDFBF7] transition-all duration-300 flex flex-col gap-4 text-left z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 border-4 border-black bg-black text-white font-head flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(155,135,110,1)] text-lg">
                    1
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-black bg-[#A7F3D0] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300">
                    <ListChecks
                      className="w-6 h-6 text-black"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-head text-lg uppercase tracking-wide text-black border-b-2 border-black pb-2">
                    Pilih Keahlian
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-3">
                    Tentukan 14 hard-skill teknis dan 5 soft-skill interaksional
                    yang paling kamu kuasai.
                  </p>
                </div>
              </div>

              {}
              <div className="relative border-4 border-black bg-white rounded p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none group hover:bg-[#FDFBF7] transition-all duration-300 flex flex-col gap-4 text-left z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 border-4 border-black bg-black text-white font-head flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(155,135,110,1)] text-lg">
                    2
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-black bg-[#FDE047] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300">
                    <Cpu className="w-6 h-6 text-black" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h4 className="font-head text-lg uppercase tracking-wide text-black border-b-2 border-black pb-2">
                    Inferensi AI
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-3">
                    Server Express mengirimkan parameter ke microservice Keras
                    model untuk prediksi cerdas.
                  </p>
                </div>
              </div>

              {}
              <div className="relative border-4 border-black bg-white rounded p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none group hover:bg-[#FDFBF7] transition-all duration-300 flex flex-col gap-4 text-left z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 border-4 border-black bg-black text-white font-head flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(155,135,110,1)] text-lg">
                    3
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-black bg-[#FCA5A5] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300">
                    <Database
                      className="w-6 h-6 text-black"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-head text-lg uppercase tracking-wide text-black border-b-2 border-black pb-2">
                    Simpan Hasil
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed mt-3">
                    Hasil probabilitas tertinggi disimpan ke database PostgreSQL
                    lokal dan dasbor riwayat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {}
        <section
          id="diskusi"
          className={`max-w-7xl mx-auto w-full flex flex-col gap-8 mt-12 mb-12 scroll-mt-24 ${
            activeHash === "diskusi" ? "animate-bounce-attention" : ""
          }`}
        >
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="text-3xl font-head uppercase tracking-tight text-text-primary">
              DISKUSI KARIER IT
            </h2>
            <p className="text-md font-semibold text-text-secondary max-w-2xl mt-1">
              Punya pertanyaan seputar dunia kerja IT? Ingin membagikan
              pengalaman atau mencari solusi bersama? Diskusikan semua di Forum
              Komunitas Matchstep.
            </p>
          </div>

          <div className="max-w-5xl mx-auto w-full px-4 sm:px-0">
            {}
            <div className="border-4 border-black rounded p-6 md:p-8 bg-[#A7F3D0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-[#8CEEBA] transition-all duration-300 text-left">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
                {}
                <div className="md:col-span-7 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded border-4 border-black bg-[#FDE047] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Users
                          className="w-6 h-6 text-black"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <h3 className="font-head text-xl uppercase tracking-tight text-black">
                          Matchstep Club
                        </h3>
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          IT Career Forum
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-slate-800 leading-relaxed">
                      Sebelum melangkah lebih jauh ke dalam forum, ini adalah
                      gambaran ruang diskusi kami. Di sini kamu bisa saling
                      bertukar pikiran tentang:
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 font-bold text-xs md:text-sm text-slate-800">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0_0_black]">
                        <Check className="w-3 h-3 text-black" strokeWidth={4} />
                      </span>
                      <span>Strategi transisi karier dari bidang non-IT.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0_0_black]">
                        <Check className="w-3 h-3 text-black" strokeWidth={4} />
                      </span>
                      <span>
                        Rekomendasi tech-stack &amp; sertifikasi terbaru.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0_0_black]">
                        <Check className="w-3 h-3 text-black" strokeWidth={4} />
                      </span>
                      <span>
                        Tips interview kerja &amp; review CV/Portfolio.
                      </span>
                    </li>
                  </ul>
                </div>

                {}
                <div className="md:col-span-5 flex flex-col justify-between gap-5 border-t-4 md:border-t-0 md:border-l-4 border-dashed border-black/30 pt-6 md:pt-0 md:pl-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-head uppercase tracking-wider text-black/70">
                      Forum Stats
                    </span>
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      {}
                      <div className="border-2 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded flex flex-col items-center justify-center min-h-[68px] transition-all duration-300 hover:shadow-none hover:bg-[#FAF8F5]">
                        {statsLoading ? (
                          <div className="flex items-center justify-center h-6 py-0.5">
                            <Ghost
                              className="w-4 h-4 text-slate-400 animate-bounce"
                              style={{ animationDuration: "1.2s" }}
                            />
                          </div>
                        ) : (
                          <div className="font-head font-black text-base text-black animate-[zoom-in_0.3s_ease-out]">
                            {formatStat(stats.members)}
                          </div>
                        )}
                        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-tight mt-0.5">
                          Anggota
                        </div>
                      </div>

                      {}
                      <div className="border-2 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded flex flex-col items-center justify-center min-h-[68px] transition-all duration-300 hover:shadow-none hover:bg-[#FAF8F5]">
                        {statsLoading ? (
                          <div className="flex items-center justify-center h-6 py-0.5">
                            <Ghost
                              className="w-4 h-4 text-slate-400 animate-bounce"
                              style={{ animationDuration: "1s" }}
                            />
                          </div>
                        ) : (
                          <div className="font-head font-black text-base text-black animate-[zoom-in_0.3s_ease-out]">
                            {formatStat(stats.topics)}
                          </div>
                        )}
                        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-tight mt-0.5">
                          Topik
                        </div>
                      </div>

                      {}
                      <div className="border-2 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded flex flex-col items-center justify-center min-h-[68px] transition-all duration-300 hover:shadow-none hover:bg-[#FAF8F5]">
                        {statsLoading ? (
                          <div className="flex items-center justify-center h-6 py-0.5">
                            <Ghost
                              className="w-4 h-4 text-slate-400 animate-bounce"
                              style={{ animationDuration: "0.8s" }}
                            />
                          </div>
                        ) : (
                          <div className="font-head font-black text-base text-black animate-[zoom-in_0.3s_ease-out]">
                            {formatStat(stats.solutions)}
                          </div>
                        )}
                        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-tight mt-0.5">
                          Solusi
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/discussion"
                    className="w-full mt-auto px-5 py-3.5 bg-[#FDE047] hover:bg-[#FACC15] text-black font-head border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase text-center text-sm font-black tracking-wider flex items-center justify-center"
                  >
                    Buka Forum Diskusi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section
          id="faq"
          className={`max-w-7xl mx-auto w-full flex flex-col gap-8 mt-8 mb-16 scroll-mt-24 ${
            activeHash === "faq" ? "animate-bounce-attention" : ""
          }`}
        >
          <div className="text-center">
            <h2 className="text-3xl font-head uppercase tracking-tight mb-4">
              PERTANYAAN UMUM
            </h2>
          </div>
          <Accordion className="space-y-6 w-full">
            <Accordion.Item
              value="item-1"
              className="!border-4 !border-black !shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:!shadow-none transition-all duration-300 !bg-white !rounded overflow-hidden"
            >
              <Accordion.Header className="font-head text-lg uppercase bg-[#A7F3D0] !border-b-4 !border-black !px-6 !py-4 hover:bg-[#6EE7B7] transition-colors">
                Apa itu MATCHSTEP?
              </Accordion.Header>
              <Accordion.Content className="!px-6 !py-6 font-bold text-slate-700 bg-white">
                MATCHSTEP adalah platform cerdas yang menggunakan Artificial
                Intelligence (Neural Network) untuk menganalisa profil keahlian
                IT kamu, lalu memberikan rekomendasi jalur karier yang paling
                sesuai berdasarkan hard-skill dan soft-skill yang kamu miliki.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              value="item-2"
              className="!border-4 !border-black !shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:!shadow-none transition-all duration-300 !bg-white !rounded overflow-hidden"
            >
              <Accordion.Header className="font-head text-lg uppercase bg-[#FDE047] !border-b-4 !border-black !px-6 !py-4 hover:bg-[#FACC15] transition-colors">
                Apakah fitur analisa ini gratis?
              </Accordion.Header>
              <Accordion.Content className="!px-6 !py-6 font-bold text-slate-700 bg-white">
                Tentu saja! Kamu bisa menggunakan fitur prediksi karier dan
                validasi keahlian di MATCHSTEP sepenuhnya gratis tanpa dipungut
                biaya apapun.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              value="item-3"
              className="!border-4 !border-black !shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:!shadow-none transition-all duration-300 !bg-white !rounded overflow-hidden"
            >
              <Accordion.Header className="font-head text-lg uppercase bg-[#FCA5A5] !border-b-4 !border-black !px-6 !py-4 hover:bg-[#F87171] transition-colors">
                Seberapa akurat AI MATCHSTEP?
              </Accordion.Header>
              <Accordion.Content className="!px-6 !py-6 font-bold text-slate-700 bg-white">
                Model Neural Network kami dilatih dengan data dari berbagai
                deskripsi pekerjaan nyata di industri, tren pasar IT, dan
                standar kompetensi global. Skor persentase yang diberikan sangat
                presisi untuk dijadikan acuan dalam mempersiapkan diri.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              value="item-4"
              className="!border-4 !border-black !shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:!shadow-none transition-all duration-300 !bg-white !rounded overflow-hidden"
            >
              <Accordion.Header className="font-head text-lg uppercase bg-[#A5F3FC] !border-b-4 !border-black !px-6 !py-4 hover:bg-[#67E8F9] transition-colors">
                Bagaimana cara AI menentukan rekomendasi?
              </Accordion.Header>
              <Accordion.Content className="!px-6 !py-6 font-bold text-slate-700 bg-white">
                AI MATCHSTEP menggunakan algoritma Neural Network pintar untuk
                memetakan kecocokan keahlian teknis (hard-skill) dan perilaku
                kerja (soft-skill) Anda dengan standar kualifikasi industri IT
                terkini secara cerdas.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              value="item-5"
              className="!border-4 !border-black !shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:!shadow-none transition-all duration-300 !bg-white !rounded overflow-hidden"
            >
              <Accordion.Header className="font-head text-lg uppercase bg-[#E9D5FF] !border-b-4 !border-black !px-6 !py-4 hover:bg-[#D8B4FE] transition-colors">
                Apakah saya bisa menyimpan hasil riwayat analisa?
              </Accordion.Header>
              <Accordion.Content className="!px-6 !py-6 font-bold text-slate-700 bg-white">
                Tentu saja! Semua hasil analisa kecocokan karier Anda akan
                otomatis tersimpan dalam dasbor riwayat akun Anda setelah Anda
                masuk/mendaftar, sehingga memudahkan Anda untuk memantau
                perkembangan kompetensi dari waktu ke waktu.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </section>
      </div>

      <Footer />
    </>
  );
}
