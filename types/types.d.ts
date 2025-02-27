import { DefaultSession } from "next-auth";

interface AuthUser {
  name: string;
  email: string;
  picture?: string | null;
  image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser;
}

interface Snapshot {
  snapshot_id: string;

}
interface Data {
  uris: string[];
  position?: number;
}

interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: string;
  total: number;
}


interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}


interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Category {
  id: string;
  name: string;
  icons: Image[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  album_type?: string;
  release_date: string;
  tracks: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  preview_url: string;
  uri: string;
  popularity: Integer;
}

export interface Playlist {
  description?: string;
  id: string;
  followers: {
    total: number;
  };
  images: Image[];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track; }];
  tracks: {
    items: [{ added_at: string; track: Track }];
    total: number;
  };
  type: string;
  total?: number;
  public: boolean
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: Playlist[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface TrackAnalysis {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: 1 | 0;
  speechiness: number;
  tempo: number;
  valence: number;
}

interface YTSearch {
  options: {
    type: string;
  };
  totalResults: number;
  pages: number;
  nextPageToken: string;
  prevPageToken?: string;
  currentPage: YoutubeVideo[];
  first: YoutubeVideo;
}

export interface YoutubeVideo {
  kind: string;
  url: string;
  id: string;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Damon {
  id: string;
  title: string;
  thumbnail: string[];
  isLive: boolean;
  channel: string;
  channelId: string;
  description: string;
  keywords: string[];
  suggestion: Suggestion[];
}

export interface Suggestion {
  id: string;
  type: string;
  thumbnail: string[];
  title: string;
  channelTitle: string;
  shortBylineText: string;
  length: object;
  isLive: boolean;
}

export interface Damon2 {
  items:Damon2Items[];
  nextPage: {};
}

export interface Damon2Items {
  id: string;
  type: string;
  thumbnail: Thumbnails[];
  title: string;
  channelTitle: string;
  shortBylineText: { runs: [Array] };
  length: { accessibility: [Object], simpleText: '2:58' };
  isLive: false;
}

export interface Thumbnails {
  url: string;
  width: number;
  height: number;
}