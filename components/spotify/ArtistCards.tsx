import { Artist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";

interface Props {
  artists: Artist[];
}

export default function ArtistCards({ artists }: Props) {
  let keycount = 0;
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <div key={keycount++}>
          <CardItem
            key={artist.id}
            id={artist.id}
            heading={artist.name}
            images={artist.images}
            altTitle={artist.name}
            subheading="Artist"
            type="artists"
            
          />
        </div>
      ))}
    </CardItemGrid>
  );
}
