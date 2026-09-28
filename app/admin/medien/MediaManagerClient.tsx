"use client";

import React, { useState } from "react";
import { MediaItem } from "@/lib/types";
import { useAdminLanguage } from "@/components/admin/AdminLanguageContext";
import { getAdminDict } from "@/lib/i18n/adminDict";
import { Upload, Copy, CheckCircle2, Trash2, Loader2, Image as ImageIcon } from "lucide-react";

interface Props {
  initialMedia: MediaItem[];
}

export default function MediaManagerClient({ initialMedia }: Props) {
  const { adminLang } = useAdminLanguage();
  const d = getAdminDict(adminLang);

  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "general");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMedia((prev) => [data.media, ...prev]);
        setFeedback(adminLang === "tr" ? "Dosya başarıyla yüklendi." : "Datei erfolgreich hochgeladen.");
        setTimeout(() => setFeedback(null), 3000);
      } else {
        alert(data.error || (adminLang === "tr" ? "Yükleme hatası." : "Fehler beim Upload."));
      }
    } catch {
      alert(adminLang === "tr" ? "Dosya yüklenirken hata oluştu." : "Fehler beim Hochladen der Datei.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setFeedback(d.media.urlCopied);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-[1px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Upload Dropzone */}
      <div className="bg-white border-2 border-dashed border-[#E8D6C5] rounded-[1px] p-8 text-center space-y-3 hover:border-[#844C36] transition-colors">
        <div className="w-12 h-12 rounded-full bg-[#FAF6F1] text-[#844C36] flex items-center justify-center mx-auto">
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
        </div>
        <div>
          <label className="cursor-pointer">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#844C36] hover:text-[#6C3D2B] underline">
              {adminLang === "tr" ? "Yüklemek için buraya tıklayın veya fotoğraf seçin" : "Klicke hier zum Hochladen"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <span className="text-xs text-[#756A63] block mt-1">
            {adminLang === "tr"
              ? "Desteklenen formatlar: JPG, PNG, WEBP (Maksimum 5 MB)"
              : "Unterstützt: JPG, PNG, WEBP (Maximal 5 MB)"}
          </span>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E8D6C5] rounded-[1px] overflow-hidden shadow-luxury-sm flex flex-col justify-between group"
          >
            <div className="aspect-square bg-[#FAF6F1] overflow-hidden flex items-center justify-center relative">
              <img
                src={item.public_url}
                alt={item.original_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs text-[#392D29] font-medium truncate" title={item.original_name}>
                {item.original_name}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#756A63]">
                <span>{(item.size_bytes / 1024).toFixed(0)} KB</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(item.public_url)}
                  className="inline-flex items-center gap-1 text-[#844C36] hover:text-[#6C3D2B] font-semibold"
                  title={d.media.copyUrl}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{adminLang === "tr" ? "Kopyala" : "Kopieren"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-12 text-sm text-[#756A63] font-light bg-white border border-[#E8D6C5] rounded-[1px]">
          {adminLang === "tr"
            ? "Henüz medya dosyası yüklenmedi. Yukarıdan görsel yükleyerek sitede kullanabilirsiniz."
            : "Noch keine eigenen Medien hochgeladen. Lade oben ein Bild hoch, um es überall einzusetzen."}
        </div>
      )}
    </div>
  );
}
