import { Link } from "react-router-dom";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] relative z-10 font-sans border-t-4 border-black mt-12">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        
        <div className="h-full w-full border-b-4 sm:border-r-4 border-black p-8 lg:p-12 bg-[#A7F3D0] hover:bg-[#86E4B8] transition-colors flex flex-col gap-4 text-left">
          <div className="flex items-center gap-2 select-none">
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
              className="w-8 h-8 text-black"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
              <g
                transform="translate(11 11) scale(0.025) translate(-256 -256)"
                fill="currentColor"
              >
                <polygon points="354.38,53.422 354.38,168.726 226.378,168.726 226.378,284.03 98.38,284.03 98.38,399.334 0,399.334 0,458.578 157.62,458.578 157.62,343.274 285.622,343.274 285.622,227.97 413.625,227.97 413.625,112.666 512,112.666 512,53.422 " />
              </g>
            </svg>
            <span className="font-head text-xl uppercase tracking-wider font-black text-black whitespace-nowrap">
              MATCHSTEP AI
            </span>
          </div>
          <p className="text-xs font-bold text-slate-800 leading-relaxed">
            Platform cerdas berbasis kecerdasan buatan untuk menganalisis,
            merekomendasikan, dan memvalidasi kesiapan karier IT Anda dengan
            standard industri global.
          </p>
        </div>

        
        <div className="h-full w-full border-b-4 lg:border-r-4 border-black p-8 lg:p-12 bg-[#E9D5FF] hover:bg-[#D8B4FE] transition-colors flex flex-col gap-3 text-left">
          <h4 className="font-head text-sm uppercase font-black tracking-wider text-black border-b-2 border-black pb-1.5 w-fit">
            Navigasi Cepat
          </h4>
          <ul className="flex flex-col gap-2 font-bold text-xs text-slate-800">
            <li>
              <Link
                to="/knows"
                className="hover:underline hover:text-black transition-all"
              >
                Sudah Tahu Target (Knows)
              </Link>
            </li>
            <li>
              <Link
                to="/predict"
                className="hover:underline hover:text-black transition-all"
              >
                Belum Tahu Target (Predict)
              </Link>
            </li>
            <li>
              <Link
                to="/career/software-engineering"
                className="hover:underline hover:text-black transition-all"
              >
                Jalur Karier (Career)
              </Link>
            </li>
            <li>
              <Link
                to="/discussion"
                className="hover:underline hover:text-black transition-all"
              >
                Forum Diskusi (Discuss)
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="hover:underline hover:text-black transition-all"
              >
                Histori Karier (History)
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="h-full w-full border-b-4 sm:border-r-4 border-black p-8 lg:p-12 bg-[#A5F3FC] hover:bg-[#67E8F9] transition-colors flex flex-col gap-3 text-left">
          <h4 className="font-head text-sm uppercase font-black tracking-wider text-black border-b-2 border-black pb-1.5 w-fit">
            Jalur Karier
          </h4>
          <ul className="flex flex-col gap-2 font-bold text-xs text-slate-800">
            <li>
              <Link
                to="/career/software-engineering"
                className="hover:underline hover:text-black transition-all"
              >
                Software Engineering
              </Link>
            </li>
            <li>
              <Link
                to="/career/data-science-ai"
                className="hover:underline hover:text-black transition-all"
              >
                Data & AI
              </Link>
            </li>
            <li>
              <Link
                to="/career/infrastructure-security"
                className="hover:underline hover:text-black transition-all"
              >
                Infrastructure & Security
              </Link>
            </li>
            <li>
              <Link
                to="/career/management-analysis"
                className="hover:underline hover:text-black transition-all"
              >
                Management & Analysis
              </Link>
            </li>
            <li>
              <Link
                to="/career/support-design"
                className="hover:underline hover:text-black transition-all"
              >
                Support & Design
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="h-full w-full border-b-4 border-black p-8 lg:p-12 bg-[#FFD6E8] hover:bg-[#FFB3D6] transition-colors flex flex-col gap-4 text-left">
          <h4 className="font-head text-sm uppercase font-black tracking-wider text-black border-b-2 border-black pb-1.5 w-fit">
            Mulai Sekarang
          </h4>
          <p className="text-xs font-bold text-slate-800">
            Dapatkan prediksi akurat dan validasi skill Anda dalam hitungan
            detik. Gratis selamanya!
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="bg-[#FDE047] border-2 border-black px-2.5 py-1 font-mono text-[9px] uppercase font-black shadow-[2px_2px_0_0_black] hover-empty-badge cursor-pointer transition-all duration-300 hover:shadow-none">
              #AIRECOMENDATION
            </span>
            <span className="bg-[#A7F3D0] border-2 border-black px-2.5 py-1 font-mono text-[9px] uppercase font-black shadow-[2px_2px_0_0_black] hover-empty-badge cursor-pointer transition-all duration-300 hover:shadow-none">
              #NEOBRUTALISM
            </span>
          </div>
        </div>
      </div>

      
      <div className="py-8 px-6 select-none max-w-7xl mx-auto w-full text-center flex flex-col items-center gap-1">
        <p className="text-xs font-bold font-head uppercase tracking-widest text-black flex items-center justify-center gap-1.5">
          <Copyright className="inline-block" strokeWidth={3} size={14} />
          <span>2026 MATCHSTEP AI</span>
        </p>
        <p className="text-[10px] font-bold font-head uppercase tracking-widest text-black/60">
          HAK CIPTA DILINDUNGI UNDANG-UNDANG.
        </p>
      </div>
    </footer>
  );
}
