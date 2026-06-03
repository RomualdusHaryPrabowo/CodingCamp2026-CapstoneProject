import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import { createDiscussionPost } from "@/utils/discussionApi";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Select } from "@/components/retroui/Select";

const MAX_FILE_SIZE = 3 * 1024 * 1024; 

const PRESET_TAGS = [
  "SoftwareDevelopment",
  "DataScience",
  "ArtificialIntelligence",
  "CyberSecurity",
  "Infrastructure",
  "ProjectManagement",
  "SystemAnalyst",
  "UIUXDesign",
  "TechSupport",
  "CodingCamp"
];

export default function DiscussionPostForm({ onPosted, trendingTags = [] }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const availableTags = trendingTags && trendingTags.length > 0
    ? trendingTags.map(t => t.tag)
    : PRESET_TAGS;
  const [attachments, setAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [selectedPresetTag, setSelectedPresetTag] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectSuccess, setIsSelectSuccess] = useState(false);

  const handleSelectPresetTag = (tag) => {
    setSelectedPresetTag(tag);
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setSelectedPresetTag("");
    setIsSelectOpen(false);
    setIsSelectSuccess(true);
    setTimeout(() => {
      setIsSelectSuccess(false);
    }, 200);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, "");
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (attachments.length + files.length > 4) {
      setError("Maksimal 4 gambar diperbolehkan.");
      return;
    }

    const newAttachments = [];
    const newPreviews = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setError("Ukuran file per gambar melebihi batas 3MB.");
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type,
        )
      ) {
        setError("Format file tidak didukung. Hanya JPEG, PNG, WebP, dan GIF.");
        return;
      }
      newAttachments.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setError("");
    setAttachments((prev) => [...prev, ...newAttachments]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    if (!user) return;

    try {
      setPosting(true);
      setError("");

      
      const contentTags = (content.match(/#[\w\u00C0-\u024F]+/g) || []).map(
        (t) => t.slice(1),
      );

      
      const allTags = Array.from(new Set([...tags, ...contentTags]));

      await createDiscussionPost({
        content: content.trim(),
        hashtags: allTags,
        authorId: user.email,
        authorName: user.name || user.email,
        authorAvatar: user.picture || null,
        attachments,
      });

      setContent("");
      setAttachments([]);
      setPreviews([]);
      setTags([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onPosted) onPosted();
    } catch (err) {
      console.error("Post error:", err);
      setError("Gagal mengirim diskusi. Coba lagi.");
    } finally {
      setPosting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="border-4 border-black rounded bg-white p-5 shadow-[6px_6px_0_0_black] transition-shadow duration-300 hover:shadow-none flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 border-2 border-black shadow-[2px_2px_0_0_black] shrink-0">
          <Avatar.Image src={user.picture} alt={user.name} />
          <Avatar.Fallback>
            {user.name?.charAt(0).toUpperCase() ||
              user.email?.charAt(0).toUpperCase() ||
              "A"}
          </Avatar.Fallback>
        </Avatar>
        <p className="font-bold text-sm">
          Posting sebagai{" "}
          <span className="text-blue-700">{user.name || user.email}</span>
        </p>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bagikan pengalaman atau pertanyaan kamu... gunakan #hashtag untuk kategorisasi"
        className="w-full bg-white text-black border-4 border-black rounded p-3 font-bold text-sm resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_3px_3px_0_0_rgba(0,0,0,0.05)]"
        disabled={posting}
      />

      
      <div className="flex flex-col gap-2">
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-[#FDE047] border-2 border-black rounded font-mono text-xs px-2 py-0.5 font-bold shadow-[2px_2px_0_0_black]"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="text-black font-bold hover:text-red-600 focus:outline-none ml-1 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1 flex gap-2 items-center">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Tambah tag baru (misal: SoftwareDevelopment)..."
              className="flex-1 min-w-0 truncate bg-white text-black border-4 border-black rounded px-3 py-1.5 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_2px_2px_0_0_rgba(0,0,0,0.05)] h-[38px]"
              disabled={posting}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={posting || !tagInput.trim()}
              size="sm"
              className="h-[38px] font-bold text-xs !bg-[#DDD6FE] hover:!bg-[#C4B5FD] text-black border-2 border-black shadow-[2px_2px_0_0_black] enabled:hover:shadow-[1px_1px_0_0_black] enabled:hover:translate-x-[1px] enabled:hover:translate-y-[1px] enabled:active:shadow-none enabled:active:translate-x-[2px] enabled:active:translate-y-[2px] transition-all duration-100 shrink-0"
            >
              Tambah Tag
            </Button>
          </div>

          
          <div className="relative min-w-[110px] shrink-0 h-[38px] flex items-center">
            <Select
              value={selectedPresetTag}
              onValueChange={handleSelectPresetTag}
              open={isSelectOpen}
              onOpenChange={setIsSelectOpen}
            >
              <Select.Trigger
                data-success={isSelectSuccess ? "true" : undefined}
                className="w-full font-head font-bold text-xs transition-all duration-100 !bg-purple-300 hover:!bg-[#C4B5FD] text-black data-[state=open]:!bg-[#C4B5FD] data-[success=true]:!bg-[#C4B5FD] h-[38px] min-w-[110px] !shadow-[2px_2px_0_0_black] hover:!shadow-[1px_1px_0_0_black] hover:!translate-x-[1px] hover:!translate-y-[1px] active:!shadow-none active:!translate-x-[2px] active:!translate-y-[2px]"
                disabled={posting}
              >
                <Select.Value placeholder="Pilih Tag" />
              </Select.Trigger>
              <Select.Content
                align="end"
                alignOffset={0}
                className="z-[9999]"
              >
                <Select.Group>
                  {availableTags.map((tag) => (
                    <Select.Item
                      key={tag}
                      value={tag}
                      className="font-bold font-head text-xs"
                    >
                      #{tag}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>

      
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {previews.map((previewUrl, index) => (
            <div
              key={index}
              className="relative border-2 border-black rounded overflow-hidden shadow-[3px_3px_0_0_black] w-20 h-20 shrink-0"
            >
              <img
                src={previewUrl}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeAttachment(index)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white border border-black rounded-full flex items-center justify-center shadow-[1px_1px_0_0_black] transition-all cursor-pointer"
              >
                <X className="w-2.5 h-2.5" strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs font-bold text-red-600 bg-red-100 border-2 border-red-400 rounded p-2">
          {error}
        </p>
      )}

      <div className="flex flex-row gap-4 w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={posting}
          variant="secondary"
          size="md"
          className="w-1/2 !bg-[#BAE6FD] hover:!bg-[#7DD3FC] text-black text-center font-bold"
        >
          Lampiran
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={posting || !content.trim()}
          variant="default"
          size="md"
          className="w-1/2 !bg-[#A7F3D0] hover:!bg-[#86efac] text-black text-center font-bold"
        >
          {posting ? "Mengirim..." : "Kirim"}
        </Button>
      </div>
    </div>
  );
}
