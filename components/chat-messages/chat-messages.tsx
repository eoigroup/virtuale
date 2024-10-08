"use client";

import { getChatHistoryByPersonaId } from "@/lib/api/chat";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ChatMessages = ({ personaId }: { personaId: string }) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const getChatHistory = async () => {
    try {
      const response = await getChatHistoryByPersonaId(personaId);
      const data = await response.json();
      console.log("data", data);
      setChatHistory(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return <div>ChatMessages</div>;
};

export default ChatMessages;
