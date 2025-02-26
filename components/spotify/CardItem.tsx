import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  images: any;
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading,
  imageRounded = false,
  type
}: Props) {

  
  return (
    <Link href={type === 'playlists' ? `/${type}/${id}/0` : `/${type}/${id}`}>
      <div className="h-full p-4 transition duration-300 rounded-lg bg-paper-500 hover:opacity-80">
        {images.length > 0 ? (
          <Image
            src={images[0].url}
            alt={altTitle}
            height={500}
            width={500}
            className={`aspect-square object-cover w-full ${
              imageRounded ? "rounded-full" : "rounded-md"
            }`}
          />
        ) : (
          <div className="w-full h-40">
            <Music className="w-full h-full bg-paper " />
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="mt-1 text-xs font-semibold truncate text-gray">
            {subheading}
          </h6>
        )}
      </div>
    </Link>
  );
}
