export enum ChatTypes {
  TEXT = "text",
  AUDIO = "audio",
  PHOTO = "photo",
  VOICE = "voice",
}

export enum ChatResponseFormats {
  TEXT = "text",
  AUDIO = "audio",
}

export enum ChatEncoding {
  TEXT = "text",
  BASE_64 = "base64",
}

export enum ChatSenderTypes {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface VoiceChatMessage {
  persona_id: string;
  format: "text" | "audio" | "base64";
  text?: string;
  audio?: string;
  metadata: Record<string, any>;
}