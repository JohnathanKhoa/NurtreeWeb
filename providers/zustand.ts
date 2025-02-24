import { Track, YoutubeVideo } from "@/types/types";
import { create } from "zustand";

interface ZustandStateV {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  currentVideo: YoutubeVideo | null;
  setCurrentVideo: (youtubeVideo: YoutubeVideo) => void;
}

export const useStoreV = create<ZustandStateV>((set) => ({
  searchQuery: "",
  setSearchQuery: (val: string) =>
    set(() => ({
      searchQuery: val,
    })),
  currentVideo: null,
  setCurrentVideo: (youtubeVideo: YoutubeVideo) =>
    set(() => ({
      currentVideo: youtubeVideo,
    })),
}));

interface ZustandState {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

export const useStore = create<ZustandState>((set) => ({
  searchQuery: "",
  setSearchQuery: (val: string) =>
    set(() => ({
      searchQuery: val,
    })),
  currentTrack: null,
  setCurrentTrack: (track: Track) =>
    set(() => ({
      currentTrack: track,
    })),
}));