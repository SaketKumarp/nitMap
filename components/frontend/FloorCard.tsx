"use client";

import Image from "next/image";

/* ✅ INTERFACES */
export interface Floor {
  label: string;
  value: string;
}

export interface NodeData {
  name: string;
  image?: string;
  floors?: Floor[];
}

interface Props {
  node: NodeData | null;
  onClose: () => void;
}

export default function FloorCard({ node, onClose }: Props) {
  if (!node) return null;

  const { name, image, floors = [] } = node;

  return (
    <div className="w-full rounded-2xl overflow-hidden backdrop-blur-xl bg-black/60 text-white shadow-xl border border-white/10">
      {/* 🔷 Header */}
      <div className="flex justify-between items-center px-3 py-2 font-semibold">
        <h2 className="text-sm">{name}</h2>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* 🖼️ Image */}
      {image && (
        <div className="relative w-full h-[140px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 🏢 Floors */}
      {floors.length > 0 ? (
        <div className="p-3 text-xs">
          {floors.map((floor, idx) => (
            <div
              key={idx}
              className={`py-1 ${
                idx !== floors.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              {floor.label} → {floor.value}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 text-xs text-gray-400">No floor data available</div>
      )}
    </div>
  );
}
