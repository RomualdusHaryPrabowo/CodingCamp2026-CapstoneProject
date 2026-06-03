import { ChevronDown, Info, Sparkles } from "lucide-react";
import { getAccuracyLabel } from "../../utils/helpers";

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

const HARD_SKILLS_MAP = [
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
  "Software Development",
  "Database Management",
  "Networking Skills",
  "Web Development",
];

const SOFT_SKILLS_MAP = [
  "Communication Skills",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Adaptability",
];

export default function HistoryItem({ history, isExpanded, onToggle }) {
  
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`relative border-4 border-black bg-white transition-all duration-300 ${
        isExpanded
          ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1"
          : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      } overflow-hidden`}
    >
      {}
      <div className="absolute top-0 right-0">
        <span
          className={`inline-block text-[10px] font-black uppercase border-l-4 border-b-4 border-black px-2 py-1 ${history.type === "SPECIFIC" ? "bg-[#E9D5FF] text-black" : "bg-[#A5F3FC] text-black"}`}
        >
          {history.type === "SPECIFIC" ? "Knows Predict" : "General Predict"}
        </span>
      </div>
      {}
      <div
        onClick={onToggle}
        className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center bg-primary text-black border-2 border-black px-2.5 py-0.5 text-xs font-bold font-head uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Rekomendasi Utama
            </span>
            <span className="text-xs font-semibold text-text-muted">
              {timeAgo(history.createdAt)}
            </span>
          </div>

          <h2 className="text-xl font-head font-bold text-text-primary truncate uppercase">
            {history.prediction_result}
          </h2>
        </div>

        {}
        <div className="flex items-center gap-6 justify-between md:justify-end border-t-4 md:border-t-0 pt-3 md:pt-0 border-black">
          <div className="text-right">
            <span className="text-xs font-bold text-text-subtle uppercase tracking-wider font-head block">
              Skala Kecocokan
            </span>
            <span className="text-xl font-head font-bold text-text-primary">
              {getAccuracyLabel(history.probability)}
            </span>
          </div>

          {}
          <div
            className={`w-8 h-8 flex items-center justify-center border-2 border-black bg-[#F8F5F1] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 ${
              isExpanded ? "rotate-180 bg-primary" : ""
            }`}
          >
            <ChevronDown className="w-4 h-4" strokeWidth={3} />
          </div>
        </div>
      </div>

      {}
      <div
        className={`transition-all duration-400 ease-in-out ${
          isExpanded
            ? "max-h-[2000px] border-t-4 border-black opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-6 bg-[#F8F5F1] space-y-8">
          {}
          <div className="bg-white p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-sm font-semibold text-text-secondary">
            <h4 className="font-head font-bold text-text-primary mb-1 flex items-center gap-2 uppercase text-xs tracking-wider">
              <Info className="w-4 h-4 text-black" strokeWidth={2} />
              Detail Hasil Prediksi
            </h4>
            Hasil analisa di atas dihitung menggunakan model Machine Learning
            berbasis data input skill Anda. Tingkat kecocokan menunjukkan
            seberapa selaras skor skill Anda dengan profil karier{" "}
            <span className="font-bold text-text-primary">
              {history.prediction_result}
            </span>
            .
          </div>

          
          {history.analisis_dinamis && (
            <div className="w-full bg-[#E0E7FF] border-2 border-black p-4 sm:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all text-left">
              <h3 className="font-head font-bold text-lg sm:text-xl uppercase tracking-tight mb-4 border-b-2 border-black pb-2 flex items-center gap-2 select-none text-black">
                <Sparkles className="w-5 h-5 text-black fill-black shrink-0" strokeWidth={2.5} />
                <span>Analisis & Rekomendasi AI</span>
              </h3>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-text-primary">
                {formatAnalysisText(history.analisis_dinamis)}
              </div>
            </div>
          )}

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {}
            <div>
              <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4">
                <h3 className="text-sm font-head font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="w-3 h-3 bg-primary border-2 border-black" />
                  Hard Skills
                </h3>
                <span className="text-xs font-bold text-text-muted font-head uppercase">
                  Skor (1 - 10)
                </span>
              </div>

              {Array.isArray(history.hard_skill) &&
              history.hard_skill.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                  {history.hard_skill.map((score, index) => {
                    const skillName =
                      HARD_SKILLS_MAP[index] || `Hard Skill ${index + 1}`;
                    const percent = (score / 10) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-xs font-bold text-text-secondary mb-1">
                          <span>{skillName}</span>
                          <span className="font-head text-text-primary">
                            {score}/10
                          </span>
                        </div>
                        <div className="w-full bg-white border-2 border-black h-4 overflow-hidden shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                          <div
                            className="bg-primary h-full border-r-2 border-black transition-all duration-500 ease-out"
                            style={{ width: `${percent}%` }}
                          />
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
            <div>
              <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4">
                <h3 className="text-sm font-head font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 border-2 border-black" />
                  Soft Skills
                </h3>
                <span className="text-xs font-bold text-text-muted font-head uppercase">
                  Skor (1 - 10)
                </span>
              </div>

              {Array.isArray(history.soft_skill) &&
              history.soft_skill.length > 0 ? (
                <div className="space-y-4">
                  {history.soft_skill.map((score, index) => {
                    const skillName =
                      SOFT_SKILLS_MAP[index] || `Soft Skill ${index + 1}`;
                    const percent = (score / 10) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-xs font-bold text-text-secondary mb-1">
                          <span>{skillName}</span>
                          <span className="font-head text-text-primary">
                            {score}/10
                          </span>
                        </div>
                        <div className="w-full bg-white border-2 border-black h-4 overflow-hidden shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                          <div
                            className="bg-green-400 h-full border-r-2 border-black transition-all duration-500 ease-out"
                            style={{ width: `${percent}%` }}
                          />
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
          </div>
        </div>
      </div>
    </div>
  );
}
