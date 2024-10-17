import React, { ChangeEvent, memo, MouseEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { Baseline, Link, Mic, SendHorizontal } from "lucide-react";
import { ChatTypes } from "@/lib/chat";
import VoiceRecorder from "../voice-recorder/voice-recorder";
import ImagePreviewModal from "../modal/image-preview-modal/image-preview-modal";
import { cn, validateImageFile } from "@/lib/utils";
import { toast } from "sonner";

const ChatInput = ({
  placeholder,
  disabled,
  onTextSend,
  onAudioSend,
  onImageSend,
}: {
  disabled?: boolean;
  placeholder: string;
  onTextSend: (text: string) => void;
  onAudioSend: (audio: string, blob: Blob) => void;
  onImageSend: (file: File) => void;
}) => {
  const [text, setText] = useState<string>("");
  const [chatType, setChatType] = useState<Partial<ChatTypes>>(ChatTypes.TEXT);
  const fileRef = useRef<HTMLInputElement>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedFile, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnTextSend = () => {
    setText("");
    onTextSend(text);
  };

  const handleOnAudioSend = (audio: string, blob: Blob) => {
    setChatType(ChatTypes.TEXT);
    onAudioSend(audio, blob);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnTextSend();
    }
  };

  const handleFileLinkClick = () => {
    fileRef.current?.click();
    setChatType(ChatTypes.TEXT);
  };

  const handleOnAduioCancel = () => {
    setChatType(ChatTypes.TEXT);
  };

  const onChangeChatType = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.getAttribute("name") as Partial<ChatTypes>;
    setChatType(name);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setIsDragging(false);

    if (text) {
      setText("");
    }

    if (files && files[0]) {
      if (!validateImageFile(files[0])) {
        toast.error("Only image file is allowed.");
        return;
      }

      setFile(files[0]);
      setShowImageModal(true);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (!validateImageFile(files[0])) {
        toast.error("Only image file is allowed.");
        return;
      }

      setFile(files[0]);
      setShowImageModal(true);
    }
  };

  const handleImageOnSend = () => {
    if (!selectedFile) return;
    onImageSend(selectedFile);
    setShowImageModal(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <>
      <div
        className="w-full"
        onDragOver={handleDragOver}
        onDrop={handleImageDrop}
        onDragLeave={handleDragLeave}
      >
        <div className="w-full flex items-center self-center h-fit flex-col max-w-3xl pb-4 z-10">
          <div className="w-full flex justify-center items-center pr-4">
            <div
              className={cn(
                "flex grow items-center p-1 rounded-3xl placeholder:text-placeholder bg-surface-elevation-1 m-4 mb-1 border-solid border border-border-outline overflow-hidden",
                { "shadow-plus-shadow": isDragging }
              )}
            >
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
                <VoiceRecorder onSend={handleOnAudioSend} onCancel={handleOnAduioCancel} />
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
              onClick={handleFileLinkClick}
            >
              <Link width={16} />
            </Button>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <ImagePreviewModal
        selectedFile={selectedFile}
        isOpen={showImageModal}
        onClose={setShowImageModal}
        onSend={handleImageOnSend}
      />
    </>
  );
};

export default memo(ChatInput);
