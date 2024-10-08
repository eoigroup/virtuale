"use client";

import React from "react";
import ChatMessagesLoading from "./chat-messages-loading";
import { ChatMessage } from "@/types/chat";
import Message from "./message";
import { IPersona } from "@/types/persona";
import { Loader } from "../loading/loader/loader";

const ChatMessages = ({
  initialLoading,
  messages,
  persona,
  processing,
}: {
  initialLoading: boolean;
  processing: boolean;
  messages: ChatMessage[];
  persona: IPersona;
}) => {
  if (initialLoading) {
    return <ChatMessagesLoading />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {messages.map((message, index) => (
        <Message persona={persona} key={`message-${index}`} message={message} />
      ))}

      {processing && (
        <div className="mx-20">
          <Loader className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
