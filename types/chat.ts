import { ChatEncoding, ChatSenderTypes, ChatTypes } from "@/lib/chat";

export type ChatMessagePayload = {
  msg: string;
  encoding: Partial<ChatEncoding>;
  type: Partial<ChatTypes>;
};

export type ChatMessage = {
  file_link?: string | null;
  message: string;
  msg_format: Partial<ChatTypes>;
  persona_id: string | number;
  sender: Partial<ChatSenderTypes>;
  unique_id: string;
};
