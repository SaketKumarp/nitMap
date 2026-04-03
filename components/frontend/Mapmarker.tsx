"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MapMarker({ active, type }: any) {
  let color = "text-gray-400";

  if (type === "gate") color = "text-green-500";
  if (type === "block") color = "text-blue-500";
  if (type === "hostel") color = "text-pink-500";
  if (type === "junction") color = "text-yellow-500";
  if (type === "library") color = "text-purple-500";

  return (
    <motion.div
      initial={{ scale: 0.6 }}
      animate={{ scale: active ? 1.3 : 0.8 }}
      transition={{ duration: 0.3 }}
      className={`${color} text-2xl drop-shadow-xl marker`}
    >
      <FaMapMarkerAlt />
    </motion.div>
  );
}
