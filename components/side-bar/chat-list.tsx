import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import ChatItem from "./chat-item";

const ChatList = () => {
  return (
    <div className="px-4 pt-5 h-full overflow-auto">
      <Typography variant={"small"} className="font-medium">
        Chats
      </Typography>

      <ul className="py-1">
        <ChatItem active={false} />
      </ul>
    </div>
  );
};

export default ChatList;
