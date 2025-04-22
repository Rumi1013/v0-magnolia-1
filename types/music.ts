export interface Artist {
  id: string
  name: string
  genre: string
  imageUrl: string
  url: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  imageUrl: string
  trackCount: number
  url: string
}

export interface Album {
  id: string
  name: string
  artist: string
  imageUrl: string
  url: string
}

export interface MusicData {
  artists: Artist[]
  playlists: Playlist[]
  albums: Album[]
}
