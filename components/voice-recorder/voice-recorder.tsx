import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Mic, MicOff, Pause, Play, SendHorizontal, Square } from "lucide-react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { convertBlobToBase64 } from "@/lib/utils";

const VoiceRecorder = ({ onSend }: { onSend: (audio: string) => void }) => {
  const {
    isPaused,
    mediaRecorder,
    recordingBlob,
    startRecording,
    stopRecording,
    togglePauseResume,
  } = useAudioRecorder({ noiseSuppression: true, echoCancellation: true });
  const [audio, setAudio] = useState<string>("");
  const color = "#536dc6";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const processAudio = async (blob: Blob) => {
    try {
      const base64Audio = await convertBlobToBase64(blob, true);
      setAudio(base64Audio);
    } catch (error) {
      console.error("Error converting the Audio Blob to base 64", error);
    }
  };

  const handleToggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
        return;
      }

      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsAudioPlaying(false);
  };

  const handleOnSend = async () => {
    if (!recordingBlob) return;

    try {
      const base64Audio = await convertBlobToBase64(recordingBlob);
      onSend(base64Audio);
    } catch (error) {
      console.error("Error converting the Audio Blob to base 64", error);
    }
  };

  useEffect(() => {
    if (!recordingBlob) return;
    processAudio(recordingBlob);
  }, [recordingBlob]);

  useEffect(() => {
    startRecording();

    return () => stopRecording();
  }, []);

  return (
    <>
      <div className="self-voice-recorder w-full relative flex flex-col ml-2">
        <div className="mx-2 flex items-center justify-center">
          {mediaRecorder && (
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              width={500}
              height={40}
              gap={3}
              barColor={color}
            />
          )}

          {recordingBlob && (
            <AudioVisualizer
              width={500}
              height={40}
              gap={3}
              barWidth={2}
              blob={recordingBlob}
              barColor={color}
            />
          )}
        </div>
      </div>

      <div className="flex gap-1">
        {audio && (
          <>
            <Button
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={handleToggleAudio}
              title={isAudioPlaying ? "Pause" : "Play"}
            >
              {isAudioPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            <Button
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={handleOnSend}
              title={"Send"}
            >
              <SendHorizontal size={16} />
            </Button>
          </>
        )}

        {!audio && (
          <>
            <Button
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={stopRecording}
              title="Stop"
            >
              <Square size={16} />
            </Button>
            <Button
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={togglePauseResume}
            >
              {isPaused ? <Mic size={16} /> : <MicOff size={16} />}
            </Button>
          </>
        )}
      </div>

      {audio && (
        <audio
          ref={audioRef}
          src={audio}
          controls={false}
          onEnded={handleEnded}
        />
      )}
    </>
  );
};

export default VoiceRecorder;
