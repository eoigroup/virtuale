"use client";

import ChatInput from "@/components/chat-input/chat-input";
import ChatMessages from "@/components/chat-messages/chat-messages";
import ChatHeader from "@/components/chat/chat-header/chat-header";
import PersonaDetailCenter from "@/components/chat/persona-detail/persona-detail-center";
import ScrollToBottom from "@/components/chat/scroll-to-bottom/scroll-to-bottom";
import ChatPageLoading from "@/components/loading/chat-page-loading/chat-page-loading";
import { usePersona } from "@/contexts/persona-context";
import { useUser } from "@/contexts/user-context";
import {
  generateResponseFromUserMessage,
  getChatHistoryByPersonaId,
} from "@/lib/api/chat";
import { getUserConvos } from "@/lib/api/persona";
import { ChatEncoding, ChatSenderTypes, ChatTypes } from "@/lib/chat";
import { convertBlobToBase64 } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { IUserConvos } from "@/types/persona";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
const ChatRightPanel = dynamic(
  () => import("@/components/chat-right-panel/chat-right-panel")
);

const ChatPage = () => {
  const { id } = useParams();
  const { personas, userConvos, setUserConvos, loading } = usePersona();
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
  const [isOpenChatRightPanel, setIsOpenChatRightPanel] =
    useState<boolean>(false);

  const welcomeMessages = () => {
    const messages = [];
    if (persona?.welcome_message) {
      messages.push({
        message: persona?.welcome_message,
        msg_format: ChatTypes.TEXT,
        persona_id: String(id),
        unique_id: user!.unique_id,
        sender: ChatSenderTypes.ASSISTANT,
      });
    }

    if (persona?.welcome_image) {
      messages.push({
        msg_format: ChatTypes.PHOTO,
        message: persona.welcome_image,
        persona_id: String(id),
        unique_id: user!.unique_id,
        sender: ChatSenderTypes.ASSISTANT,
      });
    }

    return messages;
  };

  const getChatHistory = async () => {
    setInitialLoading(true);
    try {
      const welcomeMessage = welcomeMessages();
      const response = await getChatHistoryByPersonaId(String(id));
      setChatMessages([...welcomeMessage, ...response.data]);
    } catch (error: any) {
      toast.error(error.message);
    }
    setInitialLoading(false);
  };

  const sanitizeInput = (input: string): string => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  };

  const scrollToBottom = useCallback(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, []);

  const addPersonaToChatList = useCallback(async () => {
    try {
      const response = await getUserConvos();

      setUserConvos(
        response.data.sort((a: IUserConvos, b: IUserConvos) =>
          b.timestamp.localeCompare(a.timestamp)
        )
      );
    } catch (error: any) {
      toast.error(error?.message || "Error loading user convos");
    }
  }, []);

  const handleOnGenerate = useCallback(
    async (text: string, type: Partial<ChatTypes>, blog?: Blob) => {
      if (!persona) return;
      const isPersonaExistOnChatList = userConvos.some(
        (persona) => String(persona.persona_id) === String(id)
      );
      if (!isPersonaExistOnChatList) {
        addPersonaToChatList();
      }

      const message = sanitizeInput(text.replace(/&nbsp;/g, " "));
      const encoding =
        type === ChatTypes.TEXT ? ChatEncoding.TEXT : ChatEncoding.BASE_64;

      let userMessage: ChatMessage = {
        message: text,
        msg_format: type,
        persona_id: String(id),
        unique_id: user!.unique_id,
        sender: ChatSenderTypes.USER,
      };

      if (type === ChatTypes.AUDIO && blog) {
        const fileLink = await convertBlobToBase64(blog, true);
        userMessage = {
          message: "", //TODO: add transcript of audio
          file_link: fileLink,
          msg_format: type,
          persona_id: String(id),
          unique_id: user!.unique_id,
          sender: ChatSenderTypes.USER,
        };
      }

      if (type === ChatTypes.PHOTO && blog) {
        const message = await convertBlobToBase64(blog, true);

        userMessage = {
          message: message,
          msg_format: type,
          persona_id: String(id),
          unique_id: user!.unique_id,
          sender: ChatSenderTypes.USER,
        };
      }

      setChatMessages((prev) => [...prev, userMessage]);
      setProcessing(true);
      try {
        const response = await generateResponseFromUserMessage(
          {
            msg: message,
            type: type,
            encoding: encoding,
          },
          persona.persona_id
        );
        let reply = null;
        let fileLink = null;

        if (type === ChatTypes.TEXT) {
          reply = response.reply.join(" ");
        } else if (type === ChatTypes.AUDIO) {
          reply = response.transcript;
          fileLink = response.reply;
        } else {
          reply = response.reply;
        }

        const replyMessage = {
          message: reply,
          msg_format: type === ChatTypes.PHOTO ? ChatTypes.TEXT : type,
          persona_id: String(id),
          unique_id: user!.unique_id,
          sender: ChatSenderTypes.ASSISTANT,
          ...(fileLink && { file_link: fileLink }),
        };

        setChatMessages((prev) => [...prev, replyMessage]);
      } catch (error: any) {
        toast.error(error.message);
      }
      setProcessing(false);
    },
    [id, persona, user, userConvos, addPersonaToChatList]
  );

  const handleAudioSend = useCallback(
    async (audio: string, blob: Blob) => {
      handleOnGenerate(audio, ChatTypes.AUDIO, blob);
    },
    [handleOnGenerate]
  );
  const handleImageSend = useCallback(
    async (file: File) => {
      const base64 = await convertBlobToBase64(file, true);
      handleOnGenerate(base64, ChatTypes.PHOTO, file);
    },
    [handleOnGenerate]
  );

  const handleOpenPanel = useCallback(() => {
    setIsOpenChatRightPanel(true);
  }, []);

  const handleRightPanelOpenChange = useCallback((open: boolean) => {
    setIsOpenChatRightPanel(open);
  }, []);

  const handleTextSend = useCallback(
    async (text: string) => {
      handleOnGenerate(text, ChatTypes.TEXT);
    },
    [handleOnGenerate]
  );

  const handleOnScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop ===
        scrollContainer.clientHeight;
      // Show or hide the "scroll to bottom" button
      setIsScrolledUp(!isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

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
        <ChatHeader onOpenPanel={handleOpenPanel} />
        <div
          className="flex-1 w-full overflow-y-auto "
          ref={scrollContainerRef}
          onScroll={handleOnScroll}
        >
          <PersonaDetailCenter
            key={`chat-persona-detail-${persona.persona_id}`}
            persona={persona}
          />
          <ChatMessages
            initialLoading={initialLoading}
            messages={chatMessages}
            persona={persona}
            processing={processing}
          />
          <ScrollToBottom
            isScrolledUp={isScrolledUp}
            onClick={scrollToBottom}
          />
          <div ref={lastMessageRef} />
        </div>

        <div className="flex w-full flex-col max-w-2xl">
          <Suspense>
            <ChatInput
              placeholder={`Message ${persona.name}`}
              onTextSend={handleTextSend}
              onAudioSend={handleAudioSend}
              onImageSend={handleImageSend}
              disabled={initialLoading}
            />
          </Suspense>
        </div>
      </div>

      <ChatRightPanel
        open={isOpenChatRightPanel}
        onOpenChange={handleRightPanelOpenChange}
      />
    </div>
  );
};

export default ChatPage;
