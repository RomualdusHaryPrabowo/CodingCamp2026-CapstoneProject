import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ThumbsUp, ThumbsDown, MessageCircleMore, X } from "lucide-react";
import {
  reactToDiscussion,
  fetchComments,
  addCommentToDiscussion,
  deleteDiscussionPost,
} from "@/utils/discussionApi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
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
}

export default function DiscussionItem({ discussion, onUpdate, onTagClick }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(discussion.likesCount);
  const [dislikes, setDislikes] = useState(discussion.dislikesCount);
  const [userReaction, setUserReaction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(discussion.content);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    let active = true;
    const preloadComments = async () => {
      try {
        const res = await fetchComments(discussion.id);
        if (active) {
          setComments(res.data || []);
        }
      } catch (err) {
        console.error("Preload comments error:", err);
      }
    };
    preloadComments();
    return () => {
      active = false;
    };
  }, [discussion.id]);

  const isOwner = user && user.email === discussion.authorId;

  const handleReact = async (type) => {
    if (!user) return;
    try {
      const res = await reactToDiscussion(discussion.id, user.email, type);
      setLikes(res.data.likesCount);
      setDislikes(res.data.dislikesCount);
      setUserReaction(res.data.userReaction);
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleToggleComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    
    setShowComments(true);
    
    const hasComments = comments.length > 0;
    try {
      if (!hasComments) {
        setLoadingComments(true);
      }
      const res = await fetchComments(discussion.id);
      setComments(res.data || []);
    } catch (err) {
      console.error("Load comments error:", err);
    } finally {
      if (!hasComments) {
        setLoadingComments(false);
      }
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !user) return;
    try {
      const res = await addCommentToDiscussion(discussion.id, {
        authorId: user.email,
        authorName: user.name || user.email,
        authorAvatar: user.picture || null,
        content: commentText.trim(),
      });
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      console.error("Add comment error:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus diskusi ini?")) return;
    try {
      await deleteDiscussionPost(discussion.id, user.email);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;
    try {
      const { updateDiscussionPost } = await import("@/utils/discussionApi");
      await updateDiscussionPost(discussion.id, {
        content: editContent.trim(),
        authorId: user.email,
      });
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  
  const renderContent = (text) => {
    const parts = text.split(/(#[\w\u00C0-\u024F]+)/g);
    return parts.map((part, i) => {
      if (part.match(/^#[\w\u00C0-\u024F]+$/)) {
        return (
          <button
            key={i}
            onClick={() =>
              onTagClick && onTagClick(part.slice(1).toLowerCase())
            }
            className="text-blue-700 font-bold hover:underline"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const commentCount = discussion._count?.comments ?? comments.length;

  return (
    <div className="border-4 border-black rounded bg-white p-5 shadow-[6px_6px_0_0_black] transition-all duration-300 hover:shadow-none flex flex-col gap-4">
      {}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-black shadow-[2px_2px_0_0_black]">
            <Avatar.Image
              src={discussion.authorAvatar}
              alt={discussion.authorName}
            />
            <Avatar.Fallback>
              {discussion.authorName?.charAt(0).toUpperCase() || "A"}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <p className="font-bold text-sm">{discussion.authorName}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-slate-500 font-bold">
                {timeAgo(discussion.createdAt)}
              </p>
              {discussion.updatedAt &&
                new Date(discussion.updatedAt) >
                  new Date(discussion.createdAt) && (
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded border border-orange-300">
                    diedit
                  </span>
                )}
            </div>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2 sm:gap-2 w-1/2 sm:w-auto justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial text-center text-xs font-bold border-2 border-black px-2 py-1 bg-[#FDE047] rounded font-mono shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 cursor-pointer text-black"
            >
              {isEditing ? "Batal" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-initial text-center text-xs font-bold border-2 border-black px-2 py-1 bg-red-300 rounded font-mono shadow-[2px_2px_0_0_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 cursor-pointer text-black"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-white text-black border-4 border-black rounded p-3 font-bold text-sm resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_3px_3px_0_0_rgba(0,0,0,0.05)]"
          />
          <button
            onClick={handleSaveEdit}
            className="self-end text-xs font-bold border-2 border-black px-3 py-1.5 bg-green-300 shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Simpan
          </button>
        </div>
      ) : (
        <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">
          {renderContent(discussion.content)}
        </p>
      )}

      {}
      {discussion.attachmentUrls && discussion.attachmentUrls.length > 0 && (
        <div className="flex flex-wrap justify-start gap-3 mt-2">
          {discussion.attachmentUrls.map((url, index) => {
            const fullUrl = url.startsWith("http") || url.startsWith("data:")
              ? url
              : `${BACKEND_URL}${url}`;
            return (
              <div
                key={index}
                className="border-2 border-black rounded overflow-hidden shadow-[3px_3px_0_0_black] w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-slate-100 transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <img
                  src={fullUrl}
                  alt={`Attachment ${index}`}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedImg(fullUrl)}
                />
              </div>
            );
          })}
        </div>
      )}

      {}
      {discussion.hashtags && discussion.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {discussion.hashtags.map((tag, i) => (
            <button
              key={i}
              onClick={() => onTagClick && onTagClick(tag)}
              className="bg-[#FDE047] border-2 border-black rounded font-mono text-xs px-2 py-0.5 font-bold shadow-[2px_2px_0_0_black] transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {}
      <div className="flex items-center gap-4 border-t-2 border-black pt-3">
        <button
          onClick={() => handleReact("LIKE")}
          disabled={!user}
          className={cn(
            "flex items-center gap-1.5 text-sm font-bold border-2 border-black rounded px-3 py-1.5 shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-40",
            userReaction === "LIKE" ? "bg-green-300" : "bg-white",
          )}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => handleReact("DISLIKE")}
          disabled={!user}
          className={cn(
            "flex items-center gap-1.5 text-sm font-bold border-2 border-black rounded px-3 py-1.5 shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-40",
            userReaction === "DISLIKE" ? "bg-red-300" : "bg-white",
          )}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikes}</span>
        </button>
        <button
          onClick={handleToggleComments}
          className="flex items-center gap-1.5 text-sm font-bold border-2 border-black rounded px-3 py-1.5 bg-white shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <MessageCircleMore className="w-4 h-4" />
          <span>{commentCount}</span>
        </button>
      </div>

      {}
      {showComments && (
        <div className="border-t-2 border-dashed border-black pt-4 flex flex-col gap-4">
          {loadingComments ? (
            <p className="text-xs font-bold text-slate-500 animate-pulse">
              Memuat komentar...
            </p>
          ) : comments.length === 0 ? (
            <p className="text-xs font-bold text-slate-500">
              Belum ada komentar.
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3 items-start">
                <Avatar className="w-8 h-8 border-2 border-black shadow-[2px_2px_0_0_black] shrink-0 mt-1">
                  <Avatar.Image src={c.authorAvatar} alt={c.authorName} />
                  <Avatar.Fallback className="text-xs font-bold">
                    {c.authorName?.charAt(0).toUpperCase() || "A"}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex-1 bg-[#F8F5F1] border-2 border-black rounded p-3 shadow-[2px_2px_0_0_black] transition-all duration-300 hover:shadow-none">
                  <p className="text-xs font-bold">{c.authorName}</p>
                  <p className="text-xs font-semibold mt-1">{c.content}</p>
                </div>
              </div>
            ))
          )}

          {}
          {user && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Tulis komentar..."
                className="flex-1 bg-white text-black border-4 border-black rounded p-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_3px_3px_0_0_rgba(0,0,0,0.05)]"
              />
              <Button
                onClick={handleAddComment}
                disabled={!commentText.trim() || loadingComments}
                size="sm"
                className="font-bold text-xs !bg-[#A7F3D0] hover:!bg-[#86efac] text-black h-[52px] px-4 shadow-[2px_2px_0_0_black] enabled:hover:shadow-none transition-all duration-200"
              >
                Kirim
              </Button>
            </div>
          )}
        </div>
      )}

      
      {selectedImg && createPortal(
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F5F1] border-4 border-black rounded shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-2xl w-full p-2 relative flex flex-col animate-zoom-in text-center"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 flex items-center justify-center border-2 border-black bg-rose-300 hover:bg-rose-400 shadow-[2px_2px_0_0_black] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0_0_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded cursor-pointer transition-all duration-150 text-black select-none"
              aria-label="Close image popup"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="overflow-hidden border-2 border-black rounded bg-white">
              <img
                src={selectedImg}
                alt="Popup Attachment"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}