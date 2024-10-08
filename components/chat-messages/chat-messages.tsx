"use client";

import { getChatHistoryByPersonaId } from "@/lib/api/chat";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatMessagesLoading from "./chat-messages-loading";

const ChatMessages = ({ personaId }: { personaId: string }) => {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getChatHistory = async () => {
    setLoading(true);
    try {
      const response = await getChatHistoryByPersonaId(personaId);
      setChatMessages(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  if (loading) {
    return <ChatMessagesLoading />;
  }

  return <div className="max-w-3xl mx-auto"></div>;
};

export default ChatMessages;
