import { toast } from "sonner";

export class SpeechRecognizer {
  private recognition: SpeechRecognition | null = null;
  private readonly setInterimText: (text: string) => void;
  private readonly send: (text: string) => void;
  private lastSendTime: number = 0;
  private readonly SEND_INTERVAL = 5000; // 5 seconds
  private textBuffer: string = "";

  constructor(
    setInterimText: (text: string) => void,
    send: (text: string) => void
  ) {
    this.setInterimText = setInterimText;
    this.send = send;
  }

  private setupSpeechRecognition() {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      if (!this.recognition) return;

      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.textBuffer += transcript + " ";
            this.checkAndSendBuffer();
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript) {
          this.setInterimText(interimTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        toast.error("Speech recognition error occurred");
      };
    }
  }

  private checkAndSendBuffer() {
    const currentTime = Date.now();
    if (currentTime - this.lastSendTime >= this.SEND_INTERVAL) {
      this.sendBufferedText();
    }
  }

  private sendBufferedText() {
    if (!this.textBuffer.trim()) {
      return;
    }
    this.send(this.textBuffer.trim());
    this.textBuffer = "";
  }

  async connect(): Promise<boolean> {
    try {
      this.setupSpeechRecognition();

      if (this.recognition) {
        this.recognition.start();
      }

      return true;
    } catch (error) {
      console.error("Connection Error:", error);
      toast.error("Failed to establish connection");
      return false;
    }
  }

  disconnect() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }
    }

    this.setInterimText("");
  }
}
