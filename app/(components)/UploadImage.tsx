"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

type Props = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export const UploadImage = ({ setImages }: Props) => {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data: { url: string } = await res.json();
    console.log(data);
    // TODO:i have to save this data in convex database--->

    setImages((prev) => [...prev, data.url]);
  };

  const handleFiles = async (files: File[]) => {
    try {
      setLoading(true);

      const validFiles = files.filter((file) => file.type.startsWith("image/"));

      // preview images instantly
      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...previewUrls]);

      // upload in parallel
      await Promise.all(validFiles.map(upload));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 🔥 Drag & Drop Box */}
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          handleFiles(files);
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <UploadCloud className="w-10 h-10 text-gray-500" />
          <p className="text-sm text-gray-600">
            Drag & drop images here or click to upload
          </p>
          <input
            type="file"
            multiple
            disabled={loading}
            className="hidden"
            id="fileUpload"
            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          />
          <label
            htmlFor="fileUpload"
            className="px-4 py-2 bg-black text-white rounded-lg text-sm cursor-pointer"
          >
            Select Images
          </label>
        </div>
      </div>

      {/* 🖼️ Preview Section */}
      <div className="grid grid-cols-3 gap-3">
        {previews.map((src, idx) => (
          <div key={idx} className="relative group">
            <Image
              src={src}
              alt="preview"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />

            {/* ❌ Remove button */}
            <button
              onClick={() =>
                setPreviews((prev) => prev.filter((_, i) => i !== idx))
              }
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ⏳ Loading */}
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
};
