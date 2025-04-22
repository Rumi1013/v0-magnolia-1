import type { Metadata } from "next"
import CreativeForcesClientPage from "./CreativeForcesClientPage"

export const metadata: Metadata = {
  title: "Creative Forces | Midnight Magnolia",
  description:
    "Celebrating the artists who express the depth and beauty of Black Southern experience through music and art.",
}

export default function CreativeForcesPage() {
  return <CreativeForcesClientPage />
}
