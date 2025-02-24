'use client'
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import YouTube from 'react-youtube';

interface Props {
    tracksLength: number;
    index: number;
    id: string;
    currentIndex: Dispatch<SetStateAction<number>>;
    
}




export default function Video({tracksLength, index, id, currentIndex}: Props) {
  
  return ( 
    
    <div className="flex justify-center ">
      <YouTube
        videoId={id}
        className="absolute size-full content-center "
        onEnd={() => index + 1 >= tracksLength ? redirect(`${0}`) : redirect(`${index+1}`)}
        opts={{
          width: '100%',
          height: '100%',
          title: '',
          playerVars: {
            autoplay: 1,
            controls: 1,
            cc_load_policy: 0,
            fs: 1,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0
          }
        }}
      />
    </div>
  )
}