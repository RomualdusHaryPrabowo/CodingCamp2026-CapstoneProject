import { useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Copyright, X, Code, Cpu, Brain } from "lucide-react";
import axios from "axios";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import { Slider } from "@/components/retroui/Slider";
import { Button } from "@/components/retroui/Button";
import Footer from "@/components/ui/Footer";
import { Card } from "@/components/retroui/Card";
import { Loader } from "@/components/retroui/Loader";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import PredictionResult from "@/components/ui/PredictionResult";

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
  "Communication",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Adaptability",
];

export default function GeneralPredict() {
  const navigate = useNavigate();
  const { step } = useParams();
  
  
  let currentStep = 1;
  if (step && step.startsWith("step-")) {
    const s = parseInt(step.replace("step-", ""), 10);
    if (!isNaN(s) && s >= 1 && s <= 3) {
      currentStep = s;
    }
  }

  const isSubmittingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showBars, setShowBars] = useState(false);
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  const [programmingSkills, setProgrammingSkills] = useState(
    new Array(10).fill(0),
  );
  const [hardSkills, setHardSkills] = useState(new Array(4).fill(0));
  const [softSkills, setSoftSkills] = useState(new Array(5).fill(0));

  const { user } = useAuth();
  const guestId = user?.email || "";

  const handleProgrammingSkillChange = (index, value) => {
    const newSkills = [...programmingSkills];
    newSkills[index] = parseFloat(value);
    setProgrammingSkills(newSkills);
  };

  const handleHardSkillChange = (index, value) => {
    const newSkills = [...hardSkills];
    newSkills[index] = parseFloat(value);
    setHardSkills(newSkills);
  };

  const handleSoftSkillChange = (index, value) => {
    const newSkills = [...softSkills];
    newSkills[index] = parseFloat(value);
    setSoftSkills(newSkills);
  };

  const handleSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
      setIsLoading(true);
      const allHardSkills = [...programmingSkills, ...hardSkills];
      const payload = {
        guest_id: guestId,
        hard_skills: allHardSkills.map((s) => parseFloat(s)),
        soft_skills: softSkills.map((s) => parseFloat(s)),
      };

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await axios.post(
        `${backendUrl}/api/v1/recommendations/general`,
        payload,
      );

      setTimeout(() => {
        setPredictionResult(response.data);
        setIsLoading(false);
        isSubmittingRef.current = false;
        setTimeout(() => setShowBars(true), 50);
      }, 2000);
    } catch (error) {
      alert("Error: " + error.message);
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const steps = [
    {
      id: 1,
      title: "Programming",
      desc: "Bahasa pemrograman",
      active: currentStep === 1 && !predictionResult && !isLoading,
      done: currentStep > 1 || !!predictionResult || isLoading,
    },
    {
      id: 2,
      title: "Hard Skills",
      desc: "Keahlian teknis IT",
      active: currentStep === 2 && !predictionResult && !isLoading,
      done: currentStep > 2 || !!predictionResult || isLoading,
    },
    {
      id: 3,
      title: "Soft Skills",
      desc: "Keahlian interaksional",
      active: currentStep === 3 && !predictionResult && !isLoading,
      done: !!predictionResult || isLoading,
    },
  ];

  const memoizedBackground = useMemo(() => <DiagonalSvgBackground />, []);

  return (
    <>
      {memoizedBackground}

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-6 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:pt-16 xl:pb-6 xl:px-6 flex lg:items-center items-start justify-center relative z-10">
        <div className="w-full max-w-7xl mx-auto h-auto lg:h-full flex flex-col justify-center">
          {}
          <div className="relative z-10 w-full h-auto lg:h-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0 text-slate-900 font-sans">
            {}
            <div className="hidden lg:block w-full lg:w-80 shrink-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)]">
              <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-0 lg:overflow-hidden lg:h-full">
                {}
                <div 
                  className="pt-4 px-4 pb-4 lg:pt-6 lg:px-6 lg:pb-0 flex flex-col shrink-0 select-none"
                >
                  <div className="flex flex-row items-center justify-between lg:justify-start">
                    <h3 className="font-head font-bold text-lg lg:text-xl uppercase tracking-tight shrink-0">
                      Panduan Pengisian
                    </h3>
                  </div>
                  <div className="hidden lg:block h-[3px] w-full bg-black mt-4 mb-6 shrink-0" />
                </div>

                {}
                <div className="flex flex-col flex-1 min-h-0 border-t-0 border-black bg-[#F8F5F1]">
                  <div className="space-y-4 flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 lg:overflow-y-hidden max-h-[60vh] lg:max-h-none overflow-y-auto bg-[#F8F5F1]">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        onClick={() => {
                          if (isLoading) return;
                          if (predictionResult) setPredictionResult(null);
                          
                          navigate(`/predict/step-${step.id}`, { replace: true });
                        }}
                        className={cn(
                          "p-4 border-2 rounded border-black transition-all duration-300 ease-out",
                          !isLoading
                            ? "cursor-pointer hover:shadow-none"
                            : "",
                          step.active
                            ? "bg-[#FDE047] shadow-[4px_4px_0_0_black] text-black opacity-100 relative z-10"
                            : step.done
                              ? "bg-green-300 shadow-[4px_4px_0_0_black] opacity-100"
                              : "bg-white shadow-[4px_4px_0_0_black] text-black opacity-50",
                        )}
                      >
                        <div className="font-head font-bold text-sm mb-1 opacity-80">
                          Langkah {step.id}
                        </div>
                        <div className="font-bold">{step.title}</div>
                        <div className="text-sm opacity-90">{step.desc}</div>
                      </div>
                    ))}
                  </div>

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
            <div className="flex-1 min-w-0 flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 px-4 pt-4 sm:px-6 sm:pt-6 md:px-10 md:pt-8 lg:pt-8 lg:pb-4 h-auto lg:h-full overflow-y-auto [scrollbar-gutter:stable] retro-scrollbar">
              {}
              <button
                onClick={() => setIsMobilePopupOpen(true)}
                className="lg:hidden w-full mb-4 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
              >
                <span>Panduan Pengisian</span>
                <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                  Langkah {currentStep} / 3
                </span>
              </button>

              {!isLoading && !predictionResult && (
                <>
                  <h2 className="text-3xl font-head uppercase tracking-tight mb-4 text-center border-b-4 border-black pb-4">
                    Rekomendasi Karier AI
                  </h2>
                  <div className="w-full">
                    {}
                    {currentStep === 1 && (
                      <div className="space-y-6 mt-4 w-full animate-in fade-in zoom-in-95 duration-300">
                        <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                          <div className="flex items-center gap-2 mb-4 px-1">
                            <Code className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                            <h2 className="text-sm font-bold text-slate-800">
                              Programming Languages
                            </h2>
                          </div>

                          <div className="space-y-3">
                            {programmingSkills.map((value, idx) => (
                              <div key={idx}>
                                <span className="text-xs font-medium text-slate-600 block mb-1">
                                  {PROGRAMMING_LANGUAGES[idx]}
                                </span>
                                <div className="w-full flex items-center gap-4 mb-3">
                                  <div className="flex-1">
                                     <Slider
                                      min={0}
                                      max={10}
                                      step={0.01}
                                      value={[value]}
                                      indicatorClassName="bg-blue-500"
                                      onValueChange={(val) =>
                                        handleProgrammingSkillChange(
                                          idx,
                                          Array.isArray(val) ? val[0] : val,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="text-sm font-bold text-slate-700 shrink-0 w-12 text-right">
                                    {Math.round(value)} / 10
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    )}

                    {}
                    {currentStep === 2 && (
                      <div className="space-y-6 mt-4 w-full animate-in fade-in zoom-in-95 duration-300">
                        <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                          <div className="flex items-center gap-2 mb-4 px-1">
                            <Cpu className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                            <h2 className="text-sm font-bold text-slate-800">
                              Hard Skills
                            </h2>
                          </div>

                          <div className="space-y-3">
                            {hardSkills.map((value, idx) => (
                              <div key={idx}>
                                <span className="text-xs font-medium text-slate-600 block mb-1">
                                  {HARD_SKILL_NAMES[idx]}
                                </span>
                                <div className="w-full flex items-center gap-4 mb-3">
                                  <div className="flex-1">
                                     <Slider
                                      min={0}
                                      max={10}
                                      step={0.01}
                                      value={[value]}
                                      indicatorClassName="bg-orange-500"
                                      onValueChange={(val) =>
                                        handleHardSkillChange(
                                          idx,
                                          Array.isArray(val) ? val[0] : val,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="text-sm font-bold text-slate-700 shrink-0 w-12 text-right">
                                    {Math.round(value)} / 10
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    )}

                    {}
                    {currentStep === 3 && (
                      <div className="space-y-6 mt-4 w-full animate-in fade-in zoom-in-95 duration-300">
                        <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                          <div className="flex items-center gap-2 mb-4 px-1">
                            <Brain className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                            <h2 className="text-sm font-bold text-slate-800">
                              Soft Skills
                            </h2>
                          </div>

                          <div className="space-y-3">
                            {softSkills.map((value, idx) => (
                              <div key={idx}>
                                <span className="text-xs font-medium text-slate-600 block mb-1">
                                  {SOFT_SKILL_NAMES[idx]}
                                </span>
                                <div className="w-full flex items-center gap-4 mb-3">
                                  <div className="flex-1">
                                     <Slider
                                      min={0}
                                      max={10}
                                      step={0.01}
                                      value={[value]}
                                      indicatorClassName="bg-green-500"
                                      onValueChange={(val) =>
                                        handleSoftSkillChange(
                                          idx,
                                          Array.isArray(val) ? val[0] : val,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="text-sm font-bold text-slate-700 shrink-0 w-12 text-right">
                                    {Math.round(value)} / 10
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                </>
              )}

              {isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center mt-8 w-full animate-in fade-in zoom-in-95 duration-300 min-h-[300px] pb-4 sm:pb-6 md:pb-10">
                  <Loader size="lg" />
                  <p className="mt-6 font-head font-bold text-lg uppercase tracking-widest text-black animate-pulse">
                    AI Sedang Menganalisis...
                  </p>
                </div>
              )}

              {predictionResult && !isLoading && (
                <PredictionResult
                  predictionResult={predictionResult}
                  showBars={showBars}
                  onChangePenilaian={() => {
                    setPredictionResult(null);
                    
                    navigate("/predict/step-1", { replace: true });
                  }}
                  onStartOver={() => {
                    setPredictionResult(null);
                    
                    navigate("/predict/step-1", { replace: true });
                    setProgrammingSkills(new Array(10).fill(0));
                    setHardSkills(new Array(4).fill(0));
                    setSoftSkills(new Array(5).fill(0));
                  }}
                />
              )}

              {}
              {!predictionResult && !isLoading && (
                <div className="w-full mt-auto pt-6 pb-4 sm:pb-6 md:pb-6">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t-4 border-black pt-4 w-full">
                    <Button
                      className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-rose-300 enabled:hover:!bg-rose-400"
                      onClick={() => {
                        if (currentStep === 1) {
                          navigate("/");
                        } else {
                          
                          navigate(`/predict/step-${currentStep - 1}`, { replace: true });
                        }
                      }}
                    >
                      {currentStep === 1 ? "Kembali ke Menu" : "Kembali"}
                    </Button>

                    <Button
                      className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-amber-300 enabled:hover:!bg-amber-400"
                      onClick={() => navigate("/history")}
                    >
                      Lihat Riwayat
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-emerald-400 enabled:hover:!bg-emerald-500"
                        
                        onClick={() => navigate(`/predict/step-${currentStep + 1}`, { replace: true })}
                      >
                        Lanjut
                      </Button>
                    ) : (
                      <Button
                        className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-emerald-400 enabled:hover:!bg-emerald-500"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? "Menganalisis..." : "Prediksi Karier"}
                      </Button>
                    )}
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
              Panduan Pengisian
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 retro-scrollbar">
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => {
                      setIsMobilePopupOpen(false);
                      if (isLoading) return;
                      if (predictionResult) setPredictionResult(null);
                      
                      navigate(`/predict/step-${step.id}`, { replace: true });
                    }}
                    className={cn(
                      "p-4 border-2 rounded border-black transition-all duration-300 ease-out cursor-pointer hover:shadow-none",
                      step.active
                        ? "bg-[#FDE047] shadow-[4px_4px_0_0_black] text-black opacity-100"
                        : step.done
                          ? "bg-green-300 shadow-[4px_4px_0_0_black] opacity-100"
                          : "bg-white shadow-[4px_4px_0_0_black] text-black opacity-50",
                    )}
                  >
                    <div className="font-head font-bold text-sm mb-1 opacity-80">
                      Langkah {step.id}
                    </div>
                    <div className="font-bold">{step.title}</div>
                    <div className="text-sm opacity-90">{step.desc}</div>
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