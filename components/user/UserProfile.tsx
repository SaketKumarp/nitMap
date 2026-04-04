"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function UserProfileButton() {
  return (
    <div className="flex items-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 rounded-xl",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Action
            label="Sign out"
            labelIcon={<LogOut size={16} />}
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
