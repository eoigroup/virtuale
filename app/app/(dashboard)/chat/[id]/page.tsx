"use client";

import ChatInput from "@/components/chat-input/chat-input";
import ChatMessages from "@/components/chat-messages/chat-messages";
import ChatRightPanel from "@/components/chat-right-panel/chat-right-panel";
import ChatPageLoading from "@/components/loading/chat-page-loading/chat-page-loading";
import { Loader } from "@/components/loading/loader/loader";
import PersonaImage from "@/components/persona-image/persona-image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { usePersona } from "@/contexts/persona-context";
import { useUser } from "@/contexts/user-context";
import {
  generateResponseFromUserMessage,
  getChatHistoryByPersonaId,
} from "@/lib/api/chat";
import { ChatEncoding, ChatSenderTypes, ChatTypes } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ChatPage = () => {
  const { id } = useParams();
  const { personas, loading } = usePersona();
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const persona = personas.find(
    (persona) => Number(persona.persona_id) === Number(id)
  );
  const lastMessageRef = useRef<HTMLDivElement | null>(null); // Ref for the last message
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const [isScrolledUp, setIsScrolledUp] = useState<boolean>(false); // State for tracking if scrolled up
  let scrollTimeout: NodeJS.Timeout | null = null;

  const getChatHistory = async () => {
    setInitialLoading(true);
    try {
      const response = await getChatHistoryByPersonaId(String(id));
      setChatMessages(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
    setInitialLoading(false);
  };

  const sanitizeInput = (input: string): string => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTextSend = async (text: string) => {
    if (!persona) return;

    const message = sanitizeInput(text.replace(/&nbsp;/g, " "));
    setChatMessages((prev) => [
      ...prev,
      {
        message: text,
        msg_format: ChatTypes.TEXT,
        persona_id: String(id),
        unique_id: user!.unique_id,
        sender: ChatSenderTypes.USER,
      },
    ]);
    setProcessing(true);
    try {
      const response = await generateResponseFromUserMessage(
        {
          msg: message,
          type: ChatTypes.TEXT,
          encoding: ChatEncoding.TEXT,
        },
        persona.persona_id
      );
      const reply = response.reply.join(" ");

      setChatMessages((prev) => [
        ...prev,
        {
          message: reply,
          msg_format: ChatTypes.TEXT,
          persona_id: String(id),
          unique_id: user!.unique_id,
          sender: ChatSenderTypes.ASSISTANT,
        },
      ]);
    } catch (error: any) {
      toast.error(error.message);
    }
    setProcessing(false);
  };

  const handleOnScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop ===
        scrollContainer.clientHeight;
      // Show or hide the "scroll to bottom" button
      setIsScrolledUp(!isAtBottom);

      // Remove hide-scrollbar class while scrolling
      scrollContainer.classList.remove("hide-scrollbar");

      // Clear any previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Add hide-scrollbar class after 300ms of no scrolling
      scrollTimeout = setTimeout(() => {
        scrollContainer.classList.add("hide-scrollbar");
      }, 1000);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    getChatHistory();
  }, []);

  if (loading) {
    return <ChatPageLoading />;
  }

  if (!persona) return null;

  return (
    <div className="flex h-screen">
      <div className="relative w-full flex flex-col items-center">
        <div
          className="flex-1 w-full overflow-y-auto hide-scrollbar "
          ref={scrollContainerRef}
          onScroll={handleOnScroll}
        >
          <div
            className={cn(
              "flex flex-1 flex-col items-center text-center gap-1 pb-6 pt-12",
              "overflow-auto",
              "gap-1"
            )}
          >
            <PersonaImage
              image={persona.profile_image}
              className="w-16 h-16 object-cover rounded-full"
              defaultSize={24}
            />
            <Typography variant={"h6"}>{persona.name}</Typography>
          </div>

          <ChatMessages
            initialLoading={initialLoading}
            messages={chatMessages}
            persona={persona}
            processing={processing}
          />

          <div
            className={cn(
              "absolute pointer-events-auto flex justify-end w-fit bottom-28 right-5 p-unit-sm opacity-0 transition-all translate-y-[2rem]",
              { "opacity-100 translate-y-0": isScrolledUp }
            )}
          >
            <Button
              type="button"
              aria-label="Go to most recent message"
              className="rounded-full p-1 h-auto"
              onClick={scrollToBottom}
            >
              <ChevronDown />
            </Button>
          </div>

          <div ref={lastMessageRef} />
        </div>

        <div className="flex w-full flex-col max-w-2xl">
          <ChatInput
            placeholder={`Message ${persona.name}`}
            onTextSend={handleTextSend}
          />
        </div>
      </div>
      <ChatRightPanel />
    </div>
  );
};

export default ChatPage;
