import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const ChatMessage = ({ isUser }: { isUser?: boolean }) => {
  return (
    <div
      className={cn(
        "p-2 m-0 flex flex-row items-start gap-2 justify-start ml-0 md:ml-6",
        { "flex-row-reverse": isUser }
      )}
    >
      <Skeleton className="w-6 h-6 rounded-full" />
      <div className={cn("flex flex-col gap-1", { "items-end": isUser })}>
        <Skeleton className="w-[200px] h-4" />
        <Skeleton className="w-[150px] h-12" />
      </div>
    </div>
  );
};

const ChatMessagesLoading = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <ChatMessage />
      <ChatMessage isUser />
      <ChatMessage />
    </div>
  );
};

export default ChatMessagesLoading;
