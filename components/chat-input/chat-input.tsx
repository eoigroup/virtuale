import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";

const ChatInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center self-center h-fit flex-col max-w-3xl pb-4 z-10">
        <div className="w-full flex justify-center items-center pr-4">
          <div className="flex grow items-end p-1 rounded-3xl placeholder:text-placeholder bg-surface-elevation-1 m-4 border-solid border border-border-outline overflow-hidden">
            <div className="w-full relative flex flex-col ml-2">
              <TextareaAutosize
                maxRows={5}
                className="flex px-3 w-full border file:border-0 file:bg-transparent file:text-base file:font-medium disabled:cursor-not-allowed disabled:opacity-50 resize-none focus-visible:outline-none border-input h-10 py-2 max-h-96 text-base border-none bg-surface-elevation-1 placeholder:text-placeholder placeholder:overflow-hidden placeholder:whitespace-nowrap"
                placeholder={placeholder}
              />
            </div>
            <div className="flex gap-3">
              <Button className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                <SendHorizontal size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;