import {
  ChatEncoding,
  ChatResponseFormats,
  ChatSenderTypes,
  ChatTypes,
} from "@/lib/chat";

export type ChatMessagePayload = {
  msg: string;
  encoding: Partial<ChatEncoding>;
  type: Partial<ChatTypes>;
  response_format?: Partial<ChatResponseFormats>;
};

export type ChatMessage = {
  file_link?: string | null;
  message: string;
  msg_format: Partial<ChatTypes>;
  persona_id: string | number;
  sender: Partial<ChatSenderTypes>;
  unique_id: string;
};
