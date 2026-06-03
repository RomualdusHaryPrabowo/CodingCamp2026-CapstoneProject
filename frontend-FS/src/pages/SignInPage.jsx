import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Rocket,
  Brain,
  Server,
  TrendingUp,
  Headset,
  Copyright,
  Eye,
  EyeClosed,
  Code,
} from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import { Button } from "@/components/retroui/Button";

export default function Signin() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("MATCHSTEP_users") || "[]",
    );
    const foundUser = existingUsers.find(
      (u) => u.email === email.trim() && u.password === password,
    );

    if (!foundUser) {
      setError("Email atau password salah, atau akun belum terdaftar.");
      return;
    }

    signin({
      email: foundUser.email,
      name: foundUser.name,
      picture: foundUser.picture || null,
    });
    const returnTo = location.state?.from || "/";
    navigate(returnTo);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );
        const userInfo = await res.json();

        signin({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        });

        const returnTo = location.state?.from || "/";
        navigate(returnTo);
      } catch (err) {
        console.error("Signin failed:", err);
        setError("Gagal mengambil data dari Google.");
      }
    },
    onError: () => {
      setError("Signin dibatalkan atau gagal.");
    },
  });

  return (
    <>
      <DiagonalSvgBackground />

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-12 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:px-24 xl:pb-24 flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0 text-slate-900 font-sans">
            {}
            <div className="hidden lg:flex w-full lg:w-5/12 shrink-0 bg-[#A7F3D0] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-5 lg:p-6 flex-col justify-between relative overflow-hidden h-auto lg:h-[calc(100vh-5.5rem)] xl:h-[calc(100vh-10rem)] gap-4">
              {}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
                  backgroundSize: "16px 16px",
                }}
              ></div>

              <div className="relative z-10 flex flex-col gap-1 w-full border-b-4 border-black pb-1.5">
                <div
                  onClick={() => navigate("/")}
                  className="flex items-center gap-1.5 select-none shrink-0 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-black shrink-0"
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
                  <span className="font-head text-sm uppercase tracking-wider font-black text-black">
                    MATCHSTEP AI
                  </span>
                </div>
              </div>

              <div className="relative z-10 my-auto flex flex-col gap-4 lg:gap-5 w-full py-2">
                {}
                <div className="flex flex-col gap-3.5">
                  <h2 className="font-head text-3xl lg:text-[2.2rem] uppercase font-black text-black leading-tight mb-1 text-left">
                    Lanjutkan
                    <br />
                    <span className="bg-[#FDE047] px-2 border-2 border-black rotate-2 inline-block shadow-[4px_4px_0_0_black] hover:shadow-none transition-shadow duration-300 mt-1">
                      Perjalananmu
                    </span>
                  </h2>
                  <p className="font-semibold text-sm lg:text-base text-slate-800 leading-relaxed text-left">
                    Masuk kembali untuk melihat riwayat analisismu,
                    mengeksplorasi saran karier, dan memperbarui skill set
                    milikmu.
                  </p>
                </div>

                {}
                <div className="w-full flex">
                  <div className="inline-flex items-center gap-2 bg-[#FDE047] border-4 border-black px-6 py-3 font-bold text-base uppercase shadow-[4px_4px_0_0_black] hover:shadow-none transition-shadow duration-300 -rotate-2 select-none">
                    <Rocket className="w-5 h-5 text-black shrink-0" />
                    <span>Selamat Datang Kembali!</span>
                  </div>
                </div>

                {}
                <div className="w-full flex flex-col gap-2.5 mt-2">
                  <span className="font-mono text-[10px] uppercase font-black tracking-widest text-slate-700 text-left pl-1">
                    Pilihan Bidang Karier IT
                  </span>
                  <div className="relative flex justify-between items-center p-1 bg-transparent w-full">
                    
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-0 border-t-4 border-dashed border-black z-0" />
                    {}
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-black bg-[#FDE047] flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 cursor-pointer">
                      <Code className="w-5 h-5" />
                    </div>
                    {}
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-black bg-[#A7F3D0] flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 cursor-pointer">
                      <Brain className="w-5 h-5" />
                    </div>
                    {}
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-black bg-[#A5F3FC] flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 cursor-pointer">
                      <Server className="w-5 h-5" />
                    </div>
                    {}
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-black bg-[#E9D5FF] flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 cursor-pointer">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    {}
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-black bg-[#FFD6E8] flex items-center justify-center shrink-0 text-black shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 cursor-pointer">
                      <Headset className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="relative z-10 mt-auto pt-4">
                <div className="border-t-4 border-black pt-4 flex flex-row items-center justify-center gap-1.5 text-black select-none">
                  <Copyright className="w-3.5 h-3.5" strokeWidth={3} />
                  <p className="text-xs font-bold text-center font-head uppercase tracking-widest mt-0.5">
                    2026 MATCHSTEP AI
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="flex-1 w-full lg:w-7/12 min-w-0 bg-white border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-6 md:p-8 flex flex-col justify-center overflow-y-auto retro-scrollbar h-auto lg:h-[calc(100vh-5.5rem)] xl:h-[calc(100vh-10rem)]">
              <div className="text-center md:text-left mb-6 flex flex-col gap-2 border-b-4 border-black pb-4">
                <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                  <h1 className="text-3xl font-head uppercase tracking-tight text-black">
                    Masuk
                  </h1>
                  {}
                  <div
                    onClick={() => navigate("/")}
                    className="bg-[#FDE047] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0_0_black] hover:shadow-none transition-shadow duration-300 rounded flex items-center gap-1.5 select-none shrink-0 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-black shrink-0"
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
                    <span className="font-head text-sm uppercase tracking-wider font-black text-black">
                      MATCHSTEP AI
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  Masuk ke akun Anda untuk menyimpan hasil analisa kariermu dan
                  melakukan diskusi.
                </p>
                {error && (
                  <p className="text-red-500 text-sm mt-1 font-bold">{error}</p>
                )}
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-xs uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-black rounded px-3 py-2.5 bg-[#F8F5F1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-xs uppercase">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-2 border-black rounded pl-3 pr-11 py-2.5 bg-[#F8F5F1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors focus:outline-none flex items-center justify-center w-8 h-8"
                      aria-label={
                        showPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5 text-black" />
                      ) : (
                        <EyeClosed className="w-5 h-5 text-black" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button
                    type="button"
                    onClick={handleLogin}
                    className="w-full sm:w-1/2 h-11 font-bold text-sm uppercase tracking-wider !bg-amber-300 enabled:hover:!bg-amber-400 shadow-[4px_4px_0_0_black]"
                  >
                    Masuk Sekarang
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleGoogleLogin()}
                    className="w-full sm:w-1/2 h-11 flex items-center justify-center gap-2 font-bold text-sm bg-white border-2 border-black hover:bg-gray-50 shadow-[4px_4px_0_0_black] transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Masuk Google
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm font-semibold text-gray-600">
                Belum punya akun?{" "}
                <Link
                  to="/signin"
                  className="text-black font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
