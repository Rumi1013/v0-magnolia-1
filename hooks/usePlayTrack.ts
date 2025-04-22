"use client"

import { useMusicPlayer, type Track } from "@/context/MusicPlayerContext"

export function usePlayTrack() {
  const { playTrack, addToQueue } = useMusicPlayer()

  const play = (track: Track) => {
    playTrack(track)
  }

  const addToPlayerQueue = (track: Track) => {
    addToQueue(track)
  }

  return { play, addToPlayerQueue }
}
