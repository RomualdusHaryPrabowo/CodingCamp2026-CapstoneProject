import { Link } from "react-router-dom";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center px-6">
      <DiagonalSvgBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-lg">
        {}
        <div className="border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] px-12 py-8 select-none">
          <h1 className="text-8xl md:text-9xl font-head uppercase tracking-tighter text-text-primary leading-none">
            404
          </h1>
        </div>

        {}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-head uppercase tracking-tight text-text-primary">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm md:text-base font-semibold text-text-secondary leading-relaxed">
            Sepertinya halaman yang kamu cari tidak ada, sudah dipindahkan, atau
            URL-nya salah ketik.
          </p>
        </div>

        {}
        <Link
          to="/"
          className="px-8 py-4 bg-primary text-black font-head border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none uppercase text-center text-lg tracking-wider"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
