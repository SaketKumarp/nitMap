"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "../(lib)/socket";
import { Send } from "lucide-react";

type Message = {
  room: string;
  text: string;
  sender: string;
  name?: string;
};

type Props = {
  room: string;
};

export default function ChatBox({ room }: Props) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 temporary user (later replace with auth)
  const userName = "You";

  useEffect(() => {
    if (!room) return;

    socket.emit("join_room", room);

    const handleMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!msg.trim()) return;

    socket.emit("send_message", {
      room,
      text: msg,
      name: userName, // 👈 send name
    });

    setMsg("");
  };

  return (
    <div className="flex flex-col h-[550px] rounded-2xl shadow-lg border bg-white overflow-hidden">
      {/* 💬 Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {messages.map((m, i) => {
          const isMe = m.sender === socket.id;

          return (
            <div
              key={i}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              {/* 👤 Name */}
              <span className="text-xs text-gray-500 mb-1 px-1">
                {isMe ? "You" : m.name || "User"}
              </span>

              {/* 💬 Bubble */}
              <div
                className={`
                  max-w-[65%] px-4 py-2 text-sm rounded-2xl shadow-sm
                  ${
                    isMe
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-sm"
                      : "bg-white border text-gray-800 rounded-bl-sm"
                  }
                `}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ✍️ Input */}
      <div className="flex items-center gap-2 p-3 border-t bg-white">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Message..."
          className="flex-1 px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={send}
          className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
