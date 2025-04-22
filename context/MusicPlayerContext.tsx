"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

export interface Track {
  id: string
  title: string
  artist: string
  albumArt: string
  audioSrc: string
  duration: number
  platform?: "spotify" | "apple" | "youtube" | "local"
  externalUrl?: string
}

interface MusicPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  queue: Track[]
  playTrack: (track: Track) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  nextTrack: () => void
  previousTrack: () => void
  addToQueue: (track: Track) => void
  clearQueue: () => void
  isExpanded: boolean
  toggleExpanded: () => void
}

const defaultContext: MusicPlayerContextType = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  queue: [],
  playTrack: () => {},
  togglePlay: () => {},
  setVolume: () => {},
  seekTo: () => {},
  nextTrack: () => {},
  previousTrack: () => {},
  addToQueue: () => {},
  clearQueue: () => {},
  isExpanded: false,
  toggleExpanded: () => {},
}

const MusicPlayerContext = createContext<MusicPlayerContextType>(defaultContext)

export const useMusicPlayer = () => useContext(MusicPlayerContext)

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<Track[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Handle track changes
  useEffect(() => {
    if (!audioRef.current) return

    if (currentTrack) {
      audioRef.current.src = currentTrack.audioSrc
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err)
          setIsPlaying(false)
        })
      }

      // Set up event listeners
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0)
      }

      const handleEnded = () => {
        nextTrack()
      }

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("ended", handleEnded)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
          audioRef.current.removeEventListener("ended", handleEnded)
        }
      }
    }
  }, [currentTrack])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err)
        setIsPlaying(false)
      })

      // Start progress tracking
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime)
        }
      }, 1000)
    } else {
      audioRef.current.pause()

      // Stop progress tracking
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Player controls
  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0]
      const newQueue = queue.slice(1)
      setCurrentTrack(nextTrack)
      setQueue(newQueue)
      setIsPlaying(true)
    } else if (currentTrack) {
      // Loop current track if no more in queue
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        setProgress(0)
        audioRef.current.play().catch(console.error)
      }
    }
  }

  const previousTrack = () => {
    // Go back to start of track if more than 3 seconds in
    if (audioRef.current && progress > 3) {
      audioRef.current.currentTime = 0
      setProgress(0)
    } else {
      // Implement previous track logic if needed
      // This would require keeping track of play history
    }
  }

  const addToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track])
  }

  const clearQueue = () => {
    setQueue([])
  }

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  const value = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    queue,
    playTrack,
    togglePlay,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    addToQueue,
    clearQueue,
    isExpanded,
    toggleExpanded,
  }

  return <MusicPlayerContext.Provider value={value}>{children}</MusicPlayerContext.Provider>
}
