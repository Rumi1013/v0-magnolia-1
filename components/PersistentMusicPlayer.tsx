"use client"

import { useState } from "react"
import { useMusicPlayer } from "@/context/MusicPlayerContext"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Music,
  List,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PersistentMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    queue,
    togglePlay,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    isExpanded,
    toggleExpanded,
  } = useMusicPlayer()

  const [isMuted, setIsMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(volume)
  const [showQueue, setShowQueue] = useState(false)

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume)
    } else {
      setPrevVolume(volume)
      setVolume(0)
    }
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    seekTo(value[0])
  }

  // If no current track, don't render the player
  if (!currentTrack) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${isExpanded ? "h-96" : "h-20"}`}>
      {/* Backdrop with Southern Gothic aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue to-midnight-teal opacity-95"></div>

      {/* Main player container */}
      <div className="relative h-full max-w-7xl mx-auto px-4">
        {/* Expanded view */}
        {isExpanded && (
          <div className="pt-6 pb-20 h-full flex flex-col md:flex-row gap-6">
            {/* Album art and track info */}
            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="relative aspect-square max-w-xs mx-auto md:mx-0 overflow-hidden rounded-lg border-2 border-rich-gold shadow-lg">
                <Image
                  src={currentTrack.albumArt || "/placeholder.svg?height=400&width=400&query=album+cover"}
                  alt={`${currentTrack.title} by ${currentTrack.artist}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Track details and queue */}
            <div className="flex-grow flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-playfair text-magnolia-white">{currentTrack.title}</h2>
                <p className="text-lg font-lora text-magnolia-white/80">{currentTrack.artist}</p>

                {currentTrack.externalUrl && (
                  <Link
                    href={currentTrack.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-rich-gold hover:text-rich-gold/80 transition-colors"
                  >
                    <span className="mr-1">Open in {currentTrack.platform}</span>
                    <ExternalLink size={16} />
                  </Link>
                )}
              </div>

              {/* Queue */}
              <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-playfair text-magnolia-white">Up Next</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-magnolia-white hover:text-rich-gold"
                    onClick={() => setShowQueue(!showQueue)}
                  >
                    <List size={18} className="mr-1" />
                    <span>{queue.length} tracks</span>
                  </Button>
                </div>

                <div className="overflow-y-auto max-h-40 pr-2">
                  {queue.length > 0 ? (
                    <div className="space-y-2">
                      {queue.map((track, index) => (
                        <Card key={`${track.id}-${index}`} className="bg-midnight-blue/50 border-midnight-teal">
                          <CardContent className="p-3 flex items-center">
                            <div className="relative w-10 h-10 mr-3 flex-shrink-0">
                              <Image
                                src={track.albumArt || "/placeholder.svg?height=40&width=40&query=album+cover"}
                                alt={track.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="text-sm font-medium text-magnolia-white truncate">{track.title}</p>
                              <p className="text-xs text-magnolia-white/70 truncate">{track.artist}</p>
                            </div>
                            <div className="text-xs text-magnolia-white/60 ml-2">{formatTime(track.duration)}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-magnolia-white/60">
                      <Music size={24} className="mx-auto mb-2 opacity-50" />
                      <p>No tracks in queue</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Persistent player controls (visible in both collapsed and expanded views) */}
        <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center">
          {/* Album art (mini) */}
          <div className="relative h-12 w-12 mr-3 flex-shrink-0 rounded overflow-hidden border border-rich-gold/30">
            <Image
              src={currentTrack.albumArt || "/placeholder.svg?height=48&width=48&query=album+cover"}
              alt={`${currentTrack.title} by ${currentTrack.artist}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Track info */}
          <div className="mr-4 flex-grow min-w-0 md:max-w-[200px]">
            <p className="text-sm font-medium text-magnolia-white truncate">{currentTrack.title}</p>
            <p className="text-xs text-magnolia-white/70 truncate">{currentTrack.artist}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center flex-grow md:justify-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-magnolia-white hover:text-rich-gold hidden md:flex"
              onClick={previousTrack}
            >
              <SkipBack size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-magnolia-white hover:text-rich-gold h-10 w-10 rounded-full border border-rich-gold/50"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-magnolia-white hover:text-rich-gold hidden md:flex"
              onClick={nextTrack}
            >
              <SkipForward size={20} />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="hidden md:flex items-center flex-grow max-w-md gap-2">
            <span className="text-xs text-magnolia-white/70 w-10 text-right">{formatTime(progress)}</span>

            <div className="flex-grow">
              <Slider
                value={[progress]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>

            <span className="text-xs text-magnolia-white/70 w-10">{formatTime(duration)}</span>
          </div>

          {/* Volume control */}
          <div className="hidden md:flex items-center ml-4 gap-2 w-32">
            <Button
              variant="ghost"
              size="icon"
              className="text-magnolia-white hover:text-rich-gold"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>

            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>

          {/* Expand/collapse button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-magnolia-white hover:text-rich-gold ml-2"
            onClick={toggleExpanded}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
