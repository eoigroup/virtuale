import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const ChatPageLoading = () => {
  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col items-center">
        <div className="flex-1 w-full overflow-y-auto">
          <div
            className={cn(
              "flex flex-1 flex-col items-center text-center gap-1 pb-6 pt-12",
              "overflow-auto",
              "gap-1"
            )}
          >
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-[105px] h-6" />
          </div>
        </div>

        <div className="flex w-full flex-col max-w-2xl">
          <div className="w-full">
            <div className="w-full flex items-center self-center h-fit flex-col max-w-3xl pb-4 z-10">
              <div className="w-full flex justify-center items-center pr-4">
                <div className="m-4 w-full">
                  <Skeleton className="w-full h-11" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80"></div>
    </div>
  );
};

export default ChatPageLoading;
