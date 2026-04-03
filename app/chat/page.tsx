"use client";

import { useState } from "react";
import ChatBox from "../(components)/ChatBox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type User = {
  id: string;
  name: string;
};

const users: User[] = [
  { id: "user1", name: "Rahul" },
  { id: "user2", name: "Priya" },
  { id: "user3", name: "Aman" },
  { id: "user4", name: "Sneha" },
];

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  // 🔥 room = unique per chat
  const room = `chat_${selectedUser.id}`;

  return (
    <div className="h-screen flex bg-gray-100">
      {/* 👥 LEFT SIDEBAR */}
      <div className="w-75 border-r bg-white shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-4 font-semibold text-lg border-b">Chats</div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition
                ${
                  selectedUser.id === user.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <Avatar>
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">Tap to chat</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 💬 RIGHT CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b bg-white shadow-sm">
          <Avatar>
            <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{selectedUser.name}</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 p-4">
          <ChatBox room={room} />
        </div>
      </div>
    </div>
  );
}
