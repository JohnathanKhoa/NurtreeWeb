import Image from "next/image";

interface Props {
  img: string;
}

export default function Blur({ img }: Props) {
  return (
    <>
      <div className="fixed ">
        <div className="absolute z-10 h-screen w-screen  bg-opacity-50 backdrop-blur-lg shadow-2xl"></div>
        <div className="absolute -z-10  w-screen h-screen ">
          <Image
            src={img}
            alt={""}
            height={3000}
            width={3000}
            quality={100}
            priority={true}
            className={`aspect-square md:translate-x-0 -translate-x-1/4 object-fill min-w-[700px] min-h-[700px] rounded-md`}
          />
        </div>
      </div>
    </>
  );
}
