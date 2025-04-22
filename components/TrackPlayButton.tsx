"use client"
import { Button } from "@/components/ui/button"
import { Play, Plus } from "lucide-react"
import { usePlayTrack } from "@/hooks/usePlayTrack"
import type { Track } from "@/context/MusicPlayerContext"

interface TrackPlayButtonProps {
  track: Track
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  showAddToQueue?: boolean
  className?: string
}

export default function TrackPlayButton({
  track,
  variant = "default",
  size = "default",
  showAddToQueue = true,
  className = "",
}: TrackPlayButtonProps) {
  const { play, addToPlayerQueue } = usePlayTrack()

  return (
    <div className="flex items-center gap-2">
      <Button variant={variant} size={size} onClick={() => play(track)} className={className}>
        <Play size={16} className="mr-2" />
        Play
      </Button>

      {showAddToQueue && (
        <Button variant="ghost" size={size} onClick={() => addToPlayerQueue(track)} className={className}>
          <Plus size={16} className="mr-2" />
          Add to Queue
        </Button>
      )}
    </div>
  )
}
