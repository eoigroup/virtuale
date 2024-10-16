import React, { ChangeEvent, memo, MouseEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { Baseline, Link, Mic, SendHorizontal } from "lucide-react";
import { ChatTypes } from "@/lib/chat";
import VoiceRecorder from "../voice-recorder/voice-recorder";

const ChatInput = ({
  placeholder,
  disabled,
  onTextSend,
  onAudioSend,
}: {
  disabled?: boolean;
  placeholder: string;
  onTextSend: (text: string) => void;
  onAudioSend: (audio: string) => void;
}) => {
  const [text, setText] = useState<string>("");
  const [chatType, setChatType] = useState<Partial<ChatTypes>>(ChatTypes.TEXT);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnTextSend = () => {
    setText("");
    onTextSend(text);
  };

  const handleOnAudioSend = (audio: string) => {
    setChatType(ChatTypes.TEXT);
    onAudioSend(audio);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnTextSend();
    }
  };

  const onChangeChatType = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.getAttribute("name") as Partial<ChatTypes>;
    setChatType(name);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center self-center h-fit flex-col max-w-3xl pb-4 z-10">
        <div className="w-full flex justify-center items-center pr-4">
          <div className="flex grow items-center p-1 rounded-3xl placeholder:text-placeholder bg-surface-elevation-1 m-4 mb-1 border-solid border border-border-outline overflow-hidden">
            {chatType === ChatTypes.TEXT && (
              <>
                <div className="w-full relative flex flex-col ml-2">
                  <TextareaAutosize
                    maxRows={5}
                    value={text}
                    className="flex px-3 w-full border file:border-0 file:bg-transparent file:text-base file:font-medium disabled:cursor-not-allowed disabled:opacity-50 resize-none focus-visible:outline-none border-input h-10 py-2 max-h-96 text-base border-none bg-surface-elevation-1 placeholder:text-placeholder placeholder:overflow-hidden placeholder:whitespace-nowrap"
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                  />
                </div>
                <div className="flex">
                  <Button
                    disabled={!text || disabled}
                    className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                    onClick={handleOnTextSend}
                  >
                    <SendHorizontal size={16} />
                  </Button>
                </div>
              </>
            )}

            {chatType === ChatTypes.AUDIO && (
              <VoiceRecorder onSend={handleOnAudioSend} />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 w-full px-10">
          {chatType === ChatTypes.TEXT ? (
            <Button
              variant={"link-outlined"}
              name={ChatTypes.AUDIO}
              className="p-0 h-auto"
              onClick={onChangeChatType}
            >
              <Mic width={16} />
            </Button>
          ) : (
            <Button
              variant={"link-outlined"}
              name={ChatTypes.TEXT}
              className="p-0 h-auto"
              onClick={onChangeChatType}
            >
              <Baseline size={16} />
            </Button>
          )}
          <Button
            variant={"link-outlined"}
            className="p-0 h-auto"
            name={ChatTypes.PHOTO}
            onClick={onChangeChatType}
          >
            <Link width={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInput);
