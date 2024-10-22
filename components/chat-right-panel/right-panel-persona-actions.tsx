import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Flag, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { Typography } from "../ui/typography";
import { IPersona } from "@/types/persona";
import { updatePersonaById } from "@/lib/api/persona";
import { useUser } from "@/contexts/user-context";
import ShareLinkModal from "../modal/share-link-modal/share-link-modal";

const RightPanelPersonaActions = ({ persona }: { persona: IPersona }) => {
  const [likes, setLikes] = useState(persona.likes);
  const [dislikes, setDislikes] = useState(persona.dislikes);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const { user } = useUser();
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);

  // Define the localStorage key for this user and persona
  const localStorageKey = `persona-${persona.persona_id}-user-${
    user!.unique_id
  }`;

  useEffect(() => {
    // Check localStorage to see if the user has liked or disliked the persona
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      const { liked, disliked } = JSON.parse(storedData);
      setUserHasLiked(liked);
      setUserHasDisliked(disliked);
    }
  }, [localStorageKey]);

  const handleClickLike = async () => {
    if (userHasLiked) {
      // User has already liked, prevent further likes
      return;
    }

    const newLikes = likes + 1;
    const body: any = { likes: newLikes, unique_id: user!.unique_id };

    if (userHasDisliked) {
      const newDislikes = dislikes - 1;
      body.dislikes = newDislikes;
      setDislikes(newDislikes);
    }

    try {
      // Update state optimistically
      setLikes(newLikes);
      setUserHasLiked(true);
      setUserHasDisliked(false);

      // Update localStorage to remember the user's action
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ liked: true, disliked: false })
      );

      // Send the update request to the API
      await updatePersonaById(persona.persona_id, body);
    } catch (error) {
      console.error("Error updating likes:", error);
      // Optionally revert the state if the API request fails
    }
  };

  const handleClickDislike = async () => {
    if (userHasDisliked) {
      // User has already disliked, prevent further dislikes
      return;
    }

    const newDislikes = dislikes + 1;
    const body: any = { dislikes: newDislikes, unique_id: user!.unique_id };

    if (userHasLiked) {
      const newLikes = likes - 1;
      body.likes = newLikes;
      setLikes(newLikes);
    }

    try {
      // Update state optimistically
      setDislikes(newDislikes);
      setUserHasDisliked(true);
      setUserHasLiked(false);

      // Update localStorage to remember the user's action
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ liked: false, disliked: true })
      );

      // Send the update request to the API
      await updatePersonaById(persona.persona_id, body);
    } catch (error) {
      console.error("Error updating dislikes:", error);
      // Optionally revert the state if the API request fails
    }
  };

  const openShareLinkModal = useCallback(() => {
    setShowShareLinkModal(true);
  }, []);

  const closeShareLinkModal = useCallback(() => {
    setShowShareLinkModal(false);
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex flex-row gap-1">
        <Button
          variant={"outline"}
          className="rounded-full h-auto p-3"
          onClick={openShareLinkModal}
        >
          <Share size={16} />
        </Button>

        <div className="rounded-3xl border flex items-center border-border-outline h-auto p-3 gap-2">
          <Button
            variant={"link-outlined"}
            className="p-0 h-auto"
            onClick={handleClickLike}
            disabled={userHasLiked} // Disable the like button if the user has already liked
          >
            <ThumbsUp size={16} />
          </Button>
          <Typography variant={"xsmall"}>{likes}</Typography>
          <span className="h-full w-[1px] bg-current" />

          <Button
            variant={"link-outlined"}
            className="p-0 h-auto"
            onClick={handleClickDislike}
            disabled={userHasDisliked} // Disable the dislike button if the user has already disliked
          >
            <ThumbsDown size={16} />
          </Button>
          <Typography variant={"xsmall"}>{dislikes}</Typography>
        </div>
      </div>

      <Button variant={"outline"} className="rounded-full h-auto p-3">
        <Flag size={16} />
      </Button>

      <ShareLinkModal
        personaName={persona.name}
        personaId={persona.persona_id}
        isOpen={showShareLinkModal}
        onClose={closeShareLinkModal}
      />
    </div>
  );
};

export default RightPanelPersonaActions;
