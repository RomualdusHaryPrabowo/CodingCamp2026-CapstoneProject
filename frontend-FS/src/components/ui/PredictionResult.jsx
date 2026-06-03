import { useNavigate } from "react-router-dom";
import { Button } from "@/components/retroui/Button";
import { cn } from "@/lib/utils";
import { getAccuracyLabel } from "@/utils/helpers";
import { Sparkles } from "lucide-react";

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

export default function PredictionResult({
  predictionResult,
  showBars,
  onChangePenilaian,
  onStartOver,
}) {
  const navigate = useNavigate();

  
  const mainResult =
    predictionResult.data?.prediction_result ||
    predictionResult.rekomendasi_utama;
  const confidence =
    predictionResult.data?.probability ||
    predictionResult.tingkat_keyakinan ||
    0;
  const detailMatrix =
    predictionResult.data?.detail_matriks ||
    predictionResult.detail_matriks ||
    [];

  return (
    <div className="flex flex-col gap-5 w-full animate-in fade-in zoom-in-95 duration-300">
      {}
      <div className="bg-[#A7F3D0] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] p-4 sm:p-8 w-full transition-shadow duration-300 hover:shadow-none">
        <p className="text-sm font-bold text-black uppercase tracking-widest mb-2 border-b-4 border-black pb-2 inline-block">
          Rekomendasi Karier AI
        </p>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-head font-black uppercase text-black mt-2 mb-6 break-words [word-break:break-word] hyphens-auto">
          {mainResult}
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 border-t-4 border-black pt-6">
          <div className="flex-1 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_black] transition-shadow duration-300 hover:shadow-none">
            <p className="text-sm font-bold uppercase mb-1 border-b-2 border-black pb-1">
              Skala Kecocokan
            </p>
            <p className="text-2xl font-black mt-2 uppercase tracking-tight">
              {getAccuracyLabel(confidence)}
            </p>
          </div>
          <div className="flex-1 border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_black] transition-shadow duration-300 hover:shadow-none">
            <p className="text-sm font-bold uppercase mb-1 border-b-2 border-black pb-1">
              Status Analisis
            </p>
            <p className="text-3xl font-black text-green-600 mt-2">Berhasil</p>
          </div>
        </div>
      </div>

      {}
      {detailMatrix.length > 0 && (
        <div className="w-full bg-[#F8F5F1] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
          <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-6 border-b-4 border-black pb-2">
            Perbandingan Skor Semua Jalur
          </h3>
          <div className="flex flex-col gap-4">
            {detailMatrix.map((item, idx) => {
              const isMain = item.karier === mainResult;
              return (
                <div
                  key={idx}
                  className={cn(
                    "border-4 border-black p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 shadow-[4px_4px_0_0_black] hover:shadow-none",
                    isMain ? "bg-[#FDE047]" : "bg-white",
                  )}
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-lg uppercase font-head tracking-tight">
                      {item.karier}{" "}
                      {isMain && (
                        <span className="ml-2 text-xs bg-black text-white px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0_0_black]">
                          ⭐ Match
                        </span>
                      )}
                    </h4>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 w-full mt-2 md:mt-0">
                    {}
                    <div className="flex-1 h-8 border-4 border-black bg-white w-full overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                      <div
                        className={cn(
                          "h-full border-r-4 border-black transition-all duration-1000 ease-out absolute top-0 left-0",
                          isMain ? "bg-black" : "bg-slate-400",
                        )}
                        style={{
                          width: showBars
                            ? `${item.probabilitas_persen}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <p className="font-black sm:w-40 text-left sm:text-right text-sm uppercase leading-tight shrink-0">
                      {getAccuracyLabel(item.probabilitas_persen)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(predictionResult.data?.analisis_dinamis ||
        predictionResult.analisis_dinamis) && (
        <div className="w-full bg-[#E0E7FF] border-4 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-none">
          <h3 className="font-head font-bold text-xl sm:text-2xl uppercase tracking-tight mb-4 border-b-4 border-black pb-2 flex items-center gap-2 select-none">
            <Sparkles className="w-6 h-6 text-black fill-black shrink-0" strokeWidth={2.5} />
            <span>Analisis & Rekomendasi AI</span>
          </h3>
          <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {formatAnalysisText(
              predictionResult.data?.analisis_dinamis ||
                predictionResult.analisis_dinamis,
            )}
          </div>
        </div>
      )}
      <div className="mt-4 pb-4 sm:pb-6 md:pb-10 flex flex-col sm:flex-row gap-4 w-full">
        <Button
          onClick={onChangePenilaian}
          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-cyan-300 enabled:hover:!bg-cyan-400"
        >
          Ubah Penilaian
        </Button>
        <Button
          onClick={() => navigate("/history")}
          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-amber-300 enabled:hover:!bg-amber-400"
        >
          Lihat Riwayat
        </Button>
        <Button
          onClick={onStartOver}
          className="w-full sm:flex-1 h-10 font-bold text-base uppercase tracking-wider whitespace-nowrap !bg-rose-300 enabled:hover:!bg-rose-400"
        >
          Mulai Dari Awal
        </Button>
      </div>
    </div>
  );
}
