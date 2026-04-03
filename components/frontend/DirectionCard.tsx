"use client";

export default function DirectionsCard({ steps }: { steps: string[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="absolute right-6 top-24 w-70 p-4 rounded-2xl glass-dark">
      <h2 className="text-lg font-semibold mb-4">Turn-by-turn Directions</h2>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm
              ${index === 0 ? "bg-blue-500" : ""}
              ${index === steps.length - 1 ? "bg-red-500" : ""}
              ${index !== 0 && index !== steps.length - 1 ? "bg-white/20" : ""}
              `}
            >
              {index + 1}
            </div>

            <p className="text-sm">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
