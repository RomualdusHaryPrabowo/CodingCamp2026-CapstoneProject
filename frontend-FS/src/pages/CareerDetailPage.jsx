import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Code, Brain, Server, TrendingUp, Headset, Copyright, Check, X } from "lucide-react";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import { Button } from "@/components/retroui/Button";
import Footer from "@/components/ui/Footer";

const CAREER_DATA = {
  "software-engineering": {
    title: "Software Development",
    initial: "SD",
    bgClass: "bg-[#FDE047]",
    svg: <Code className="w-8 h-8 text-black" />,
    description:
      "Fokus pada database, server logic, API integration, dan kestabilan sistem data padding.",
    details:
      "Sebagai Software Developer, Anda akan merancang, menguji, dan memelihara sistem aplikasi. Keahlian ini mencakup pemahaman mendalam tentang arsitektur server, integrasi RESTful API, manajemen basis data relasional/non-relasional, serta menulis kode yang bersih dan terstruktur.",
    skills: [
      "JavaScript/TypeScript",
      "Python / Go",
      "SQL & NoSQL Database",
      "RESTful APIs / GraphQL",
      "Git Version Control",
      "Software Design Patterns",
    ],
  },
  "data-science-ai": {
    title: "Data dan AI",
    initial: "DA",
    bgClass: "bg-[#A7F3D0]",
    svg: <Brain className="w-8 h-8 text-black" />,
    description:
      "Merancang visual interaktif, website Neo-Brutalist responsive, dan alur integrasi client-side.",
    details:
      "Sebagai spesialis Data & AI, Anda akan bekerja dengan volume data besar untuk mengidentifikasi trends, melatih model kecerdasan buatan, dan merancang sistem pengambilan keputusan otomatis menggunakan algoritma machine learning terkini.",
    skills: [
      "Python (Pandas, NumPy)",
      "Tensorflow / Keras / PyTorch",
      "Data Visualization (Tableau, Seaborn)",
      "SQL & Big Data Tools",
      "Statistical Modeling",
      "Machine Learning Algorithms",
    ],
  },
  "infrastructure-security": {
    title: "Infrastructure and Security",
    initial: "IS",
    bgClass: "bg-[#A5F3FC]",
    svg: <Server className="w-8 h-8 text-black" />,
    description:
      "Membangun arsitektur CI/CD, mengotomatisasi server, memantau server lokal, dan cloud computing.",
    details:
      "Bidang ini berfokus pada keandalan sistem, otomatisasi penyebaran kode (CI/CD), arsitektur cloud terdistribusi, serta pertahanan keamanan jaringan dari potensi ancaman siber.",
    skills: [
      "Docker & Kubernetes",
      "AWS / Google Cloud / Azure",
      "CI/CD Pipelines (GitHub Actions)",
      "Linux / Bash Scripting",
      "Network Architecture",
      "Cybersecurity Protocols",
    ],
  },
  "management-analysis": {
    title: "Management and Analysist",
    initial: "MA",
    bgClass: "bg-[#E9D5FF]",
    svg: <TrendingUp className="w-8 h-8 text-black" />,
    description:
      "Menganalisa data skala besar, membuat model statistik Keras/Tensorflow, dan visualisasi grafik.",
    details:
      "Menjembatani kebutuhan bisnis dengan tim teknis. Peran ini menuntut kemampuan analisis kebutuhan pasar, manajemen siklus hidup produk, penyusunan roadmap produk, serta kepemimpinan tim lintas divisi.",
    skills: [
      "Agile & Scrum Methodology",
      "Product Roadmap & Strategy",
      "Business Analytics",
      "User Research & Testing",
      "Project Management Tools",
      "Stakeholder Communication",
    ],
  },
  "support-design": {
    title: "Support and Design",
    initial: "SU",
    bgClass: "bg-[#FFD6E8]",
    svg: <Headset className="w-8 h-8 text-black" />,
    description:
      "Menganalisa data skala besar, membuat model statistik Keras/Tensorflow, dan visualisasi grafik.",
    details:
      "Fokus pada kegunaan, keindahan antarmuka pengguna (UI), pengalaman pengguna (UX), serta pemeliharaan sistem agar dapat berjalan secara optimal sesuai kebutuhan operasional harian.",
    skills: [
      "UI/UX Design (Figma)",
      "User Persona & Wireframing",
      "Technical Support & Troubleshooting",
      "Customer Journey Mapping",
      "QA Testing & Documentation",
      "Responsive CSS / Design System",
    ],
  },
};

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  const currentId = id && CAREER_DATA[id] ? id : "software-engineering";
  const career = CAREER_DATA[currentId];

  const memoizedBackground = useMemo(() => <DiagonalSvgBackground />, []);

  return (
    <>
      {memoizedBackground}

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-6 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:pt-16 xl:pb-6 xl:px-6 flex lg:items-center items-start justify-center relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0">
            {}
            <div className="hidden lg:block w-full lg:w-80 shrink-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)]">
              <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-0 lg:overflow-hidden lg:h-full">
                {}
                <div className="pt-4 px-4 pb-4 lg:pt-6 lg:px-6 lg:pb-0 flex flex-col lg:flex-col shrink-0 select-none">
                  <div className="flex flex-row items-center justify-between lg:justify-start">
                    <h3 className="font-head font-bold text-lg lg:text-xl uppercase tracking-tight">
                      Jalur Karier
                    </h3>
                  </div>
                  <div className="hidden lg:block h-[3px] w-full bg-black mt-4 mb-6" />
                </div>

                {}
                <div className="flex flex-col flex-1 min-h-0 border-t-0 border-black bg-[#F8F5F1]">
                  {}
                  <div className="lg:hidden p-4 pb-0 shrink-0 select-none">
                    <a
                      href="/#diskusi"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 border-2 border-black rounded bg-cyan-300 hover:bg-cyan-400 font-head font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_0_black] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0_0_black] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-black text-center"
                    >
                      Forum Diskusi
                    </a>
                  </div>
                  <div className="space-y-4 flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 lg:overflow-y-auto retro-scrollbar max-h-[60vh] lg:max-h-none overflow-y-auto">
                    {Object.entries(CAREER_DATA).map(([key, value]) => (
                      <div
                        key={key}
                        onClick={() => {
                          navigate(`/career/${key}`);
                        }}
                        className={`flex items-center gap-3 p-3 border-2 border-black rounded transition-all duration-300 cursor-pointer shadow-[4px_4px_0_0_black] hover:shadow-none ${
                          key === currentId
                            ? "bg-[#FDE047] text-black font-bold relative z-10"
                            : "bg-white text-text-secondary"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 border-black ${value.bgClass} flex items-center justify-center shrink-0`}
                        >
                          <div className="scale-75 flex items-center justify-center">
                            {value.svg}
                          </div>
                        </div>
                        <div className="font-head text-xs uppercase tracking-tight leading-tight">
                          {value.title}
                        </div>
                      </div>
                    ))}
                  </div>

                  {}
                  <div className="mt-auto pt-2 pb-4 px-4 lg:px-6 shrink-0 border-t-4 lg:border-t-0 border-black bg-[#F8F5F1]">
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
            <div className="flex-1 min-w-0 flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-6 md:px-10 md:pt-8 md:pb-8 lg:pt-8 lg:pb-4 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)] lg:overflow-y-auto [scrollbar-gutter:stable] retro-scrollbar text-left gap-6">
              {}
              <button
                onClick={() => setIsMobilePopupOpen(true)}
                className="lg:hidden w-full mb-2 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
              >
                <span>Jalur Karier</span>
                <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                  Pilih Jalur
                </span>
              </button>
              <div className="flex items-center gap-4 border-b-4 border-black pb-6">
                <div
                  className={`h-16 w-16 rounded-full border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${career.bgClass} flex items-center justify-center shrink-0`}
                >
                  {career.svg}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-head uppercase tracking-tight text-text-primary break-words [word-break:break-word] hyphens-auto">
                    {career.title}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-head text-lg uppercase text-text-primary">
                  Deskripsi Karier
                </h3>
                <p className="text-sm md:text-base font-medium text-text-secondary leading-relaxed bg-[#F5F0EA] border-2 border-black rounded p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300">
                  {career.details}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-head text-lg uppercase text-text-primary">
                  Core Skills yang Dibutuhkan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {career.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-black rounded p-3 font-mono text-xs font-bold text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-black shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

                {}
                <div className="mt-auto pt-6 border-t-4 border-black flex flex-col sm:flex-row gap-4 w-full">
                  <Button
                    onClick={() => navigate("/")}
                    className="w-full sm:flex-1 h-12 font-bold text-base bg-rose-300 hover:bg-rose-400"
                  >
                    Kembali ke Home
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/knows", { state: { selectedPath: currentId } })
                    }
                    className="w-full sm:flex-1 h-12 font-bold text-base !bg-emerald-400 hover:!bg-emerald-500 text-black"
                  >
                    Mulai Validasi AI
                  </Button>
                </div>
              </div>
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
              Jalur Karier
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 retro-scrollbar">
              <div className="space-y-4">
                {Object.entries(CAREER_DATA).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => {
                      navigate(`/career/${key}`);
                      setIsMobilePopupOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 border-2 border-black rounded transition-all duration-300 cursor-pointer shadow-[4px_4px_0_0_black] hover:shadow-none ${
                      key === currentId
                        ? "bg-[#FDE047] text-black font-bold relative z-10"
                        : "bg-white text-text-secondary"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 border-black ${value.bgClass} flex items-center justify-center shrink-0`}
                    >
                      <div className="scale-75 flex items-center justify-center">
                        {value.svg}
                      </div>
                    </div>
                    <div className="font-head text-xs uppercase tracking-tight leading-tight">
                      {value.title}
                    </div>
                  </div>
                ))}
              </div>
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
