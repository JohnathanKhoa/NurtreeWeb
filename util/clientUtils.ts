export const fmtMSS = (seconds: number) => {
  return new Date(seconds).toISOString().substring(15, 15 + 4);
};

export const searchFilterTags = [
  { link: "", label: "All" },
  { link: "/tracks", label: "Songs" },
  { link: "/albums", label: "Albums" },
  { link: "/artists", label: "Artists" },
  { link: "/playlists", label: "Playlists" },
];
