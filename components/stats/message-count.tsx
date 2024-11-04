import { useEffect, useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { getPersonaStats } from '@/lib/api/stats';
import { AudioLines } from "lucide-react";

interface MessageCountProps {
  personaId: number | string;
}

// Define interfaces based on the API documentation
interface MessageCount {
  type: string;
  count: number;
  total_tokens: number;
  estimated_cost: number;
}

interface PersonaStats {
  persona_id: number;
  persona_name: string;
  users_count: number;
  msg_count: MessageCount[];
  total_tokens: number;
  total_estimated_cost: number;
}

const MessageCount = ({ personaId }: MessageCountProps) => {
  const [messageCount, setMessageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      if (!mounted) return;
      
      try {
        setIsLoading(true);
        const data = await getPersonaStats(personaId.toString());
        
        if (mounted && data?.msg_count) {
          const total = data.msg_count.reduce((sum: number, msg: MessageCount) => 
            sum + (msg.count || 0), 0
          );
          setMessageCount(total);
        }
      } catch (error) {
        console.error('Failed to fetch message count:', error);
        if (mounted) {
          setMessageCount(0);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [personaId]);

  return (
    <div className="flex items-center gap-1">
      <AudioLines size={12} className="text-gray-400" />
      <Typography variant="xsmall" className="text-gray-400">
        {isLoading ? '...' : messageCount > 0 ? `${messageCount}m` : '0'}
      </Typography>
    </div>
  );
};

export default MessageCount; 