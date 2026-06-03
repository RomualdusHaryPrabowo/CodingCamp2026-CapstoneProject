import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Code, Brain, Server, TrendingUp, Headset, Copyright, X, Cpu } from "lucide-react";
import { predictCareerAI } from "@/utils/api";
import { Select } from "@/components/retroui/Select";
import { Slider } from "@/components/retroui/Slider";
import { Button } from "@/components/retroui/Button";
import { Empty } from "@/components/retroui/Empty";
import { Card } from "@/components/retroui/Card";
import { Loader } from "@/components/retroui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import PredictionResult from "@/components/ui/PredictionResult";

const CAREERS = [
  {
    id: "software-engineering",
    name: "Software Engineering",
    hardSkills: [
      3.2, 2.8, 3.4, 8.3, 0.5, 0.7, 8.6, 8.2, 2.6, 2.1, 6.0, 6.7, 7.0, 4.8,
    ],
    softSkills: [4.9, 5.6, 2.9, 7.3, 7.9],
  },
  {
    id: "data-science-ai",
    name: "Data & AI",
    hardSkills: [
      0.7, 0.5, 1.9, 7.3, 0.8, 6.3, 8.0, 6.3, 5.7, 8.6, 1.4, 8.1, 6.3, 3.7,
    ],
    softSkills: [2.1, 5.7, 3.3, 8.4, 0.1],
  },
  {
    id: "infrastructure-security",
    name: "Infrastructure & Security",
    hardSkills: [
      2.8, 5.4, 7.5, 1.8, 0.9, 0.3, 7.8, 8.8, 1.6, 6.1, 4.7, 7.3, 0.7, 6.1,
    ],
    softSkills: [5.6, 1.3, 6.8, 1.0, 2.2],
  },
  {
    id: "management-analysis",
    name: "Manajemen & Analysis",
    hardSkills: [
      8.3, 1.7, 2.9, 8.0, 8.6, 7.2, 8.8, 0.5, 2.1, 5.6, 8.9, 5.1, 0.3, 4.3,
    ],
    softSkills: [0.9, 3.0, 3.3, 7.0, 4.2],
  },
  {
    id: "support-design",
    name: "Support & Design",
    hardSkills: [
      7.1, 0.0, 8.1, 3.8, 0.4, 0.0, 5.4, 3.7, 3.6, 6.1, 4.6, 8.9, 3.7, 8.8,
    ],
    softSkills: [2.2, 4.0, 3.8, 6.0, 5.2],
  },
];

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

export default function SkillsForm({ career, onBack }) {
  const navigate = useNavigate();
  const { step } = useParams();

  
  const urlStep = useMemo(() => {
    if (step && step.startsWith("step-")) {
      const s = parseInt(step.replace("step-", ""), 10);
      return !isNaN(s) && s >= 1 && s <= 3 ? s : 1;
    }
    return 1;
  }, [step]);

  const [selectedCareer, setSelectedCareer] = useState(() => {
    if (career) {
      const matched = CAREERS.find(
        (c) => c.id === career.id || c.name === career.name,
      );
      if (matched) return matched.name;
    }
    if (urlStep >= 2) {
      return CAREERS[0].name;
    }
    return "";
  });

  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showBars, setShowBars] = useState(false);
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectSuccess, setIsSelectSuccess] = useState(false);
  const { user } = useAuth();
  const guestId = user?.email || "";

  const hoverTimeoutRef = useRef(null);

  const handleSelectEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (!isSelectOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsSelectOpen(true);
      }, 200);
    } else {
      setIsSelectOpen(true);
    }
  };

  const handleSelectLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSelectOpen(false);
    }, 150);
  };

  const [programmingSkills, setProgrammingSkills] = useState(() => {
    if (career) {
      const matched = CAREERS.find(
        (c) => c.id === career.id || c.name === career.name,
      );
      if (matched) {
        return matched.hardSkills
          .slice(0, 10)
          .map((s) => Math.max(0, Math.min(10, Math.round(s))));
      }
    }
    if (urlStep >= 2) {
      return CAREERS[0].hardSkills
        .slice(0, 10)
        .map((s) => Math.max(0, Math.min(10, Math.round(s))));
    }
    return new Array(10).fill(0);
  });

  const [hardSkills, setHardSkills] = useState(() => {
    if (career) {
      const matched = CAREERS.find(
        (c) => c.id === career.id || c.name === career.name,
      );
      if (matched) {
        return matched.hardSkills
          .slice(10, 14)
          .map((s) => Math.max(0, Math.min(10, Math.round(s))));
      }
    }
    if (urlStep >= 2) {
      return CAREERS[0].hardSkills
        .slice(10, 14)
        .map((s) => Math.max(0, Math.min(10, Math.round(s))));
    }
    return new Array(4).fill(0);
  });

  const [softSkills, setSoftSkills] = useState(() => {
    if (career) {
      const matched = CAREERS.find(
        (c) => c.id === career.id || c.name === career.name,
      );
      if (matched) {
        return matched.softSkills.map((s) =>
          Math.max(0, Math.min(10, Math.round(s))),
        );
      }
    }
    if (urlStep >= 2) {
      return CAREERS[0].softSkills.map((s) =>
        Math.max(0, Math.min(10, Math.round(s))),
      );
    }
    return new Array(5).fill(0);
  });

  const handleCareerChange = useCallback((careerName) => {
    setSelectedCareer(careerName);
    setPredictionResult(null);
    setIsSelectOpen(false);
    setIsSelectSuccess(true);
    setTimeout(() => {
      setIsSelectSuccess(false);
    }, 200);
    if (careerName) {
      const newCareer = CAREERS.find((c) => c.name === careerName);
      if (newCareer) {
        setProgrammingSkills(
          newCareer.hardSkills
            .slice(0, 10)
            .map((s) => Math.max(0, Math.min(10, Math.round(s)))),
        );
        setHardSkills(
          newCareer.hardSkills
            .slice(10, 14)
            .map((s) => Math.max(0, Math.min(10, Math.round(s)))),
        );
        setSoftSkills(
          newCareer.softSkills.map((s) =>
            Math.max(0, Math.min(10, Math.round(s))),
          ),
        );
      }
    }
  }, []);

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

  const handleSubmit = async (customProg, customHard, customSoft) => {
    try {
      setLoading(true);
      const prog = customProg || programmingSkills;
      const hard = customHard || hardSkills;
      const soft = customSoft || softSkills;
      const allHardSkills = [...prog, ...hard];
      const response = await predictCareerAI(
        allHardSkills.map((s) => parseFloat(s)),
        soft.map((s) => parseFloat(s)),
        { guest_id: guestId },
      );

      setTimeout(() => {
        setPredictionResult(response.data);
        setLoading(false);
        setTimeout(() => setShowBars(true), 50);
      }, 2000);
    } catch (error) {
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Pilih Karier",
      desc: "Tentukan tujuan karier",
      active: !selectedCareer && !predictionResult,
      done: !!selectedCareer,
    },
    {
      id: 2,
      title: "Evaluasi Keahlian",
      desc: "Atur nilai keahlian",
      active: !!selectedCareer && !loading && !predictionResult,
      done: loading || !!predictionResult,
    },
    {
      id: 3,
      title: "Analisis AI",
      desc: "Dapatkan prediksi karier",
      active: loading,
      done: !!predictionResult,
    },
  ];

  const currentStepComputed =
    !selectedCareer && !predictionResult
      ? 1
      : !!selectedCareer && !loading && !predictionResult
        ? 2
        : 3;

  
  const [prevUrlStep, setPrevUrlStep] = useState(urlStep);
  if (urlStep !== prevUrlStep) {
    setPrevUrlStep(urlStep);
    if (urlStep === 1) {
      setSelectedCareer("");
      setPredictionResult(null);
      setShowBars(false);
    } else if (urlStep === 2) {
      if (!selectedCareer) {
        const defaultCareer = CAREERS[0];
        setSelectedCareer(defaultCareer.name);
        setProgrammingSkills(
          defaultCareer.hardSkills
            .slice(0, 10)
            .map((s) => Math.max(0, Math.min(10, Math.round(s)))),
        );
        setHardSkills(
          defaultCareer.hardSkills
            .slice(10, 14)
            .map((s) => Math.max(0, Math.min(10, Math.round(s)))),
        );
        setSoftSkills(
          defaultCareer.softSkills.map((s) =>
            Math.max(0, Math.min(10, Math.round(s))),
          ),
        );
      }
      if (predictionResult) {
        setPredictionResult(null);
        setShowBars(false);
      }
    }
  }

  useEffect(() => {
    navigate(`/knows/step-${currentStepComputed}`, { replace: true });
  }, [currentStepComputed, navigate]);

  return (
    <div className="relative w-full h-auto lg:h-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0 text-slate-900 font-sans">
      {}
      <div className="hidden lg:block w-full lg:w-80 shrink-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)]">
        <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-0 lg:overflow-hidden lg:h-full">
          {}
          <div className="pt-4 px-4 pb-4 lg:pt-6 lg:px-6 lg:pb-0 flex flex-col shrink-0 select-none">
            <div className="flex flex-row items-center justify-between lg:justify-start">
              <h3 className="font-head font-bold text-lg lg:text-xl uppercase tracking-tight">
                Panduan Pengisian
              </h3>
            </div>
            <div className="hidden lg:block h-[3px] w-full bg-black mt-4 mb-6" />
          </div>

          {}
          <div className="flex flex-col flex-1 min-h-0 border-t-0 border-black bg-[#F8F5F1]">
            <div className="space-y-4 flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 lg:overflow-y-hidden max-h-[60vh] lg:max-h-none overflow-y-auto bg-[#F8F5F1]">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => {
                    if (loading) return;

                    if (step.id === 1 && step.done) {
                      setSelectedCareer("");
                      setPredictionResult(null);
                      setShowBars(false);
                      setIsSelectSuccess(true);
                      setTimeout(() => setIsSelectSuccess(false), 200);
                    } else if (step.id === 2 && !step.active && !step.done) {
                      handleCareerChange(CAREERS[0].name);
                    } else if (step.id === 2 && predictionResult) {
                      setPredictionResult(null);
                      setShowBars(false);
                    } else if (step.id === 3 && !loading && !predictionResult) {
                      if (!selectedCareer) {
                        const defaultCareer = CAREERS[0];
                        setSelectedCareer(defaultCareer.name);

                        const defaultProg = defaultCareer.hardSkills
                          .slice(0, 10)
                          .map((s) => Math.max(0, Math.min(10, Math.round(s))));
                        const defaultHard = defaultCareer.hardSkills
                          .slice(10, 14)
                          .map((s) => Math.max(0, Math.min(10, Math.round(s))));
                        const defaultSoft = defaultCareer.softSkills.map((s) =>
                          Math.max(0, Math.min(10, Math.round(s))),
                        );

                        setProgrammingSkills(defaultProg);
                        setHardSkills(defaultHard);
                        setSoftSkills(defaultSoft);

                        handleSubmit(defaultProg, defaultHard, defaultSoft);
                      } else {
                        handleSubmit();
                      }
                    }
                  }}
                  className={cn(
                    "p-4 border-2 rounded border-black transition-all duration-300 ease-out",
                    !loading
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
              <div className="hidden lg:block h-[3px] w-full bg-black mb-4" />

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
            Langkah {currentStepComputed} / 3
          </span>
        </button>

        {!loading && !predictionResult && (
          <>
            <h2 className="text-3xl font-head uppercase tracking-tight mb-4 text-center border-b-4 border-black pb-4">
              Validasi Target Keahlian
            </h2>
            <div className="w-full">
              {}
              <div className="mb-6 lg:mb-5 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <div
                  className="w-full sm:flex-1 relative min-w-0"
                  onMouseEnter={handleSelectEnter}
                  onMouseLeave={handleSelectLeave}
                >
                  <Select
                    value={selectedCareer}
                    onValueChange={(val) => handleCareerChange(val)}
                    open={isSelectOpen}
                    onOpenChange={setIsSelectOpen}
                  >
                    <Select.Trigger
                      data-success={isSelectSuccess ? "true" : undefined}
                      className="w-full font-head font-bold text-base transition-all duration-200 !bg-purple-300 hover:!bg-purple-400 data-[state=open]:!bg-purple-400 data-[success=true]:!bg-purple-400"
                    >
                      <Select.Value placeholder="Mohon pilih karier..." />
                    </Select.Trigger>
                    <Select.Content
                      align="start"
                      alignOffset={8}
                      onMouseEnter={handleSelectEnter}
                      onMouseLeave={handleSelectLeave}
                    >
                      <Select.Group>
                        {CAREERS.map((c) => (
                          <Select.Item
                            key={c.id}
                            value={c.name}
                            className="font-bold font-head text-base"
                          >
                            {c.name}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select>
                </div>

                <Button
                  className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-cyan-300 enabled:hover:!bg-cyan-400"
                  disabled={!selectedCareer}
                  onClick={() => {
                    if (selectedCareer) {
                      const careerObj = CAREERS.find(
                        (c) => c.name === selectedCareer,
                      );
                      if (careerObj) {
                        navigate(`/career/${careerObj.id}`);
                      }
                    }
                  }}
                >
                  Lihat Detail Karier
                </Button>
              </div>

              {!selectedCareer && (
                <Empty className="w-full mt-4 lg:mt-3 py-6 md:py-8 lg:py-7 animate-in fade-in zoom-in-95 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer">
                  <Empty.Content>
                    <Empty.Icon className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-6 text-black mb-1 w-auto">
                      <Code className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10 text-black" />
                      <Brain className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10 text-black" />
                      <Server className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10 text-black" />
                      <TrendingUp className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10 text-black" />
                      <Headset className="w-8 h-8 md:w-11 md:h-11 lg:w-10 lg:h-10 text-black" />
                    </Empty.Icon>
                    <Empty.Title>Pilih Karier</Empty.Title>
                    <Empty.Separator className="w-48 h-[3px] mt-1 mb-2" />
                    <Empty.Description>
                      Silakan pilih rumpun karier untuk melihat penilaian
                      keahlian
                    </Empty.Description>
                  </Empty.Content>
                </Empty>
              )}

              {selectedCareer && !predictionResult && !loading && (
                <div className="space-y-6 mt-8 w-full animate-in fade-in zoom-in-95 duration-300">
                  <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                    {}
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <Code className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                      <h2 className="text-sm font-bold text-slate-800">
                        Programming Languages
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {programmingSkills.map((value, idx) => {
                        return (
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
                                  onValueCommitted={(val) =>
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
                        );
                      })}
                    </div>
                  </Card>

                  <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                    {}
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <Cpu className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                      <h2 className="text-sm font-bold text-slate-800">
                        Hard Skills
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {hardSkills.map((value, idx) => {
                        return (
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
                                  onValueCommitted={(val) =>
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
                        );
                      })}
                    </div>
                  </Card>

                  <Card className="p-6 w-full border-black shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300 cursor-pointer bg-white text-black">
                    {}
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <Brain className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                      <h2 className="text-sm font-bold text-slate-800">
                        Soft Skills
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {softSkills.map((value, idx) => {
                        return (
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
                                  onValueCommitted={(val) =>
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
                        );
                      })}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </>
        )}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center mt-8 w-full animate-in fade-in zoom-in-95 duration-300 min-h-[300px] pb-4 sm:pb-6 md:pb-10">
            <Loader size="lg" />
            <p className="mt-6 font-head font-bold text-lg uppercase tracking-widest text-black animate-pulse">
              AI Sedang Menganalisis...
            </p>
          </div>
        )}

        {predictionResult && !loading && (
          <PredictionResult
            predictionResult={predictionResult}
            showBars={showBars}
            onChangePenilaian={() => setPredictionResult(null)}
            onStartOver={() => {
              setPredictionResult(null);
              setSelectedCareer("");
            }}
          />
        )}

        {}
        {!predictionResult && !loading && (
          <div className="w-full mt-auto pt-6 pb-4 sm:pb-6 md:pb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t-4 border-black pt-4 w-full">
              <Button
                className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-rose-300 enabled:hover:!bg-rose-400"
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    window.location.href = "/";
                  }
                }}
              >
                Kembali ke Menu
              </Button>

              <Button
                className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-amber-300 enabled:hover:!bg-amber-400"
                onClick={() => {
                  window.location.href = "/history";
                }}
              >
                Lihat Riwayat
              </Button>

              <Button
                className="w-full sm:flex-1 h-10 font-bold text-base whitespace-nowrap !bg-emerald-400 enabled:hover:!bg-emerald-500"
                onClick={() => handleSubmit()}
                disabled={loading || !selectedCareer}
              >
                {loading ? "Menganalisis..." : "Validasi Keahlian"}
              </Button>
            </div>
          </div>
        )}
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
                      if (loading) return;

                      if (step.id === 1 && step.done) {
                        setSelectedCareer("");
                        setPredictionResult(null);
                        setShowBars(false);
                        setIsSelectSuccess(true);
                        setTimeout(() => setIsSelectSuccess(false), 200);
                      } else if (step.id === 2 && !step.active && !step.done) {
                        handleCareerChange(CAREERS[0].name);
                      } else if (step.id === 2 && predictionResult) {
                        setPredictionResult(null);
                        setShowBars(false);
                      } else if (
                        step.id === 3 &&
                        !loading &&
                        !predictionResult
                      ) {
                        if (!selectedCareer) {
                          const defaultCareer = CAREERS[0];
                          setSelectedCareer(defaultCareer.name);

                          const defaultProg = defaultCareer.hardSkills
                             .slice(0, 10)
                            .map((s) =>
                              Math.max(0, Math.min(10, Math.round(s))),
                            );
                          const defaultHard = defaultCareer.hardSkills
                            .slice(10, 14)
                            .map((s) =>
                              Math.max(0, Math.min(10, Math.round(s))),
                            );
                          const defaultSoft = defaultCareer.softSkills.map(
                            (s) => Math.max(0, Math.min(10, Math.round(s))),
                          );

                          setProgrammingSkills(defaultProg);
                          setHardSkills(defaultHard);
                          setSoftSkills(defaultSoft);

                          handleSubmit(defaultProg, defaultHard, defaultSoft);
                        } else {
                          handleSubmit();
                        }
                      }
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
    </div>
  );
}
