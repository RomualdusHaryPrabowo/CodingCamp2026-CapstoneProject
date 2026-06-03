import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Lock, Copyright, Trash, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchDiscussions } from "@/utils/discussionApi";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import DiscussionItem from "@/components/discussion/DiscussionItem";
import DiscussionPostForm from "@/components/discussion/DiscussionPostForm";
import Footer from "@/components/ui/Footer";

export default function DiscussionPage() {
  const { user } = useAuth();
  const location = useLocation(); 

  const [discussions, setDiscussions] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") || searchParams.get("id") || null;
  const setActiveTag = (tag) => {
    if (tag) {
      setSearchParams({ tag });
    } else {
      setSearchParams({});
    }
  };
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  
  const loadDiscussions = useCallback(async (hashtag = null, cursor = null) => {
    try {
      
      
      const res = await fetchDiscussions({
        hashtag: hashtag || undefined,
        limit: 10,
        cursor: cursor || undefined,
      });

      if (cursor) {
        setDiscussions((prev) => [...prev, ...(res.data || [])]);
      } else {
        setDiscussions(res.data || []);
      }

      setTrendingTags(res.trendingTags || []);
      setNextCursor(res.nextCursor || null);
    } catch (err) {
      console.error("Failed to load discussions:", err);
    } finally {
      
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadDiscussions(activeTag);
    };

    fetchData();
  }, [activeTag, loadDiscussions]);

  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    setLoading(true); 
    setIsMobilePopupOpen(false); 
  };

  return (
    <>
      <DiagonalSvgBackground />

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-6 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:pt-16 xl:pb-6 xl:px-6 flex lg:items-center items-start justify-center relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 xl:gap-8 min-h-0">
            {}
            <div className="hidden lg:block w-full lg:w-80 shrink-0 lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)]">
              <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 p-0 lg:overflow-hidden lg:h-full">
                {}
                <div className="pt-4 px-4 pb-4 lg:pt-6 lg:px-6 lg:pb-0 flex flex-col shrink-0 select-none">
                  <h3 className="font-head font-bold text-lg lg:text-xl uppercase tracking-tight">
                    Trending Tags
                  </h3>
                  <div className="hidden lg:block h-[3px] w-full bg-black mt-4 mb-6" />
                </div>

                {}
                <div className="flex flex-col flex-1 min-h-0 border-t-0 border-black bg-[#F8F5F1]">
                  {trendingTags.length === 0 ? (
                    <div className="p-4 lg:px-6 flex-1 bg-[#F8F5F1]">
                      <p className="text-xs font-bold text-slate-500">
                        Belum ada tag.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 pt-4 px-4 pb-4 lg:px-6 lg:pb-8 lg:pt-1 lg:overflow-y-auto retro-scrollbar max-h-[60vh] lg:max-h-none overflow-y-auto bg-[#F8F5F1]">
                      {trendingTags.map((t) => (
                        <button
                          key={t.tag}
                          onClick={() => handleTagClick(t.tag)}
                          className={`flex items-center justify-between text-left w-full p-2 border-2 border-black rounded font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-[4px_4px_0_0_black] hover:shadow-none ${
                            activeTag === t.tag
                              ? "bg-[#FDE047] text-black font-bold relative z-10"
                              : "bg-white text-text-secondary"
                          }`}
                        >
                          <span className="truncate mr-2">#{t.tag}</span>
                          <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded shrink-0">
                            {t.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

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
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-6 md:px-10 md:pt-8 md:pb-8 lg:pt-8 lg:pb-8 gap-6 text-left lg:h-[calc(100vh-5.5rem)] lg:max-h-[640px] xl:h-[calc(100vh-5.5rem)] lg:overflow-y-auto [scrollbar-gutter:stable] retro-scrollbar">
                {}
                <button
                  onClick={() => setIsMobilePopupOpen(true)}
                  className="lg:hidden w-full mb-2 py-2.5 px-4 border-4 border-black rounded bg-[#FDE047] hover:bg-yellow-400 font-head font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black flex items-center justify-between cursor-pointer select-none"
                >
                  <span>Trending Tags</span>
                  <span className="font-mono text-xs bg-black text-white px-2 py-0.5 rounded border border-black">
                    Filter Tag
                  </span>
                </button>

                {}
                <h1 className="text-3xl font-head uppercase tracking-tight font-black mb-4 text-center border-b-4 border-black pb-4 break-words [word-break:break-word] hyphens-auto">
                  Forum Diskusi
                </h1>

                {}
                {!user ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0px_1px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300">
                    <Lock className="w-12 h-12 mb-6 text-black" />
                    <h3 className="font-head text-2xl uppercase font-black mb-2 tracking-tight">
                      Akses Terkunci
                    </h3>
                    <p className="text-slate-700 font-bold max-w-md mb-6 text-sm">
                      Masuk terlebih dahulu untuk membuat diskusi, berkomentar,
                      dan berinteraksi dengan komunitas.
                    </p>
                    <Link
                      to="/signon"
                      state={{ from: location.pathname }}
                      className="bg-[#FDE047] px-6 py-3 border-2 border-black rounded font-head font-bold uppercase text-black tracking-wider shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] transition-all text-xs"
                    >
                      Masuk Sekarang
                    </Link>
                  </div>
                ) : (
                  <DiscussionPostForm
                    trendingTags={trendingTags}
                    onPosted={() => {
                      setLoading(true);
                      loadDiscussions(activeTag);
                    }}
                  />
                )}

                {}
                {activeTag && (
                  <div className="flex items-center gap-3 bg-[#F8F5F1] border-2 border-black rounded px-4 py-3 shadow-[2px_2px_0_0_black]">
                    <span className="font-bold text-xs">Filter aktif:</span>
                    <span className="bg-[#FDE047] border-2 border-black rounded font-mono text-xs px-2 py-0.5 font-bold shadow-[1px_1px_0_0_black]">
                      #{activeTag}
                    </span>
                    <button
                      onClick={() => {
                        setActiveTag(null);
                        setLoading(true); 
                      }}
                      className="ml-auto text-xs font-bold border-2 border-black rounded px-2.5 py-1 bg-red-200 shadow-[2px_2px_0_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_black] transition-all flex items-center gap-1"
                    >
                      <Trash className="w-3.5 h-3.5" /> Hapus Filter
                    </button>
                  </div>
                )}

                {}
                {(!user && !loading && discussions.length === 0) ? null : (
                  loading ? (
                    <div className="flex flex-col gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="border-4 border-black rounded bg-[#F8F5F1] p-5 shadow-[4px_4px_0_0_black] animate-pulse h-32"
                        />
                      ))}
                    </div>
                  ) : discussions.length === 0 ? (
                    <div className="text-center p-12 bg-[#F8F5F1] border-2 border-black rounded shadow-[4px_4px_0_0_black]">
                      <p className="font-head uppercase text-xl font-bold text-slate-600">
                        {activeTag
                          ? `Tidak ada diskusi dengan tag #${activeTag}`
                          : "Belum ada diskusi"}
                      </p>
                      <p className="text-sm font-bold text-slate-500 mt-2">
                        {activeTag
                          ? "Coba hapus filter atau gunakan tag lain."
                          : "Jadilah yang pertama memulai percakapan!"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {discussions.map((d) => (
                        <DiscussionItem
                          key={d.id}
                          discussion={d}
                          onUpdate={() => loadDiscussions(activeTag)} 
                          onTagClick={handleTagClick}
                        />
                      ))}

                      {}
                      {nextCursor && (
                        <button
                          onClick={() => {
                            setLoadingMore(true);
                            loadDiscussions(activeTag, nextCursor);
                          }}
                          disabled={loadingMore}
                          className="self-center font-head font-bold uppercase text-xs border-2 border-black rounded px-6 py-3 bg-[#FDE047] shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] transition-all disabled:opacity-50"
                        >
                          {loadingMore ? "Memuat..." : "Muat Lebih Banyak"}
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      {isMobilePopupOpen && (
        <div
          onClick={() => setIsMobilePopupOpen(false)}
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
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
              Trending Tags
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 retro-scrollbar">
              {trendingTags.length === 0 ? (
                <p className="text-xs font-bold text-slate-500">
                  Belum ada tag.
                </p>
              ) : (
                <div className="space-y-4">
                  {trendingTags.map((t) => (
                    <button
                      key={t.tag}
                      onClick={() => handleTagClick(t.tag)}
                      className={`flex items-center justify-between text-left w-full p-2 border-2 border-black rounded font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-[4px_4px_0_0_black] hover:shadow-none ${
                        activeTag === t.tag
                          ? "bg-[#FDE047] text-black font-bold"
                          : "bg-white text-text-secondary"
                      }`}
                    >
                      <span className="truncate mr-2">#{t.tag}</span>
                      <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded shrink-0">
                        {t.count}
                      </span>
                    </button>
                  ))}
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
