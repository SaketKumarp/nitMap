export function createUserMarker(imageUrl: string) {
  const el = document.createElement("div");

  el.style.width = "50px";
  el.style.height = "50px";
  el.style.borderRadius = "50%";
  el.style.overflow = "hidden";
  el.style.border = "3px solid #3b82f6";
  el.style.boxShadow = "0 0 15px rgba(59,130,246,0.8)";
  el.style.animation = "pulse 2s infinite";
  el.style.position = "relative";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

  el.appendChild(img);

  // 🟢 Online dot
  const dot = document.createElement("div");
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.background = "lime";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  dot.style.bottom = "2px";
  dot.style.right = "2px";
  dot.style.border = "2px solid black";

  el.appendChild(dot);

  return el;
}
