import type { Metadata } from "next"
import MusicPlayerDemo from "@/components/MusicPlayerDemo"

export const metadata: Metadata = {
  title: "Music Player Demo | Midnight Magnolia",
  description: "Experience our persistent music player featuring the Creative Forces that inspire Midnight Magnolia",
}

export default function MusicPlayerDemoPage() {
  return <MusicPlayerDemo />
}
