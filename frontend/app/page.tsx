import StartButton from "@/components/StartButton";
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-[#F9F7F3] pt-32 pb-16 px-8 font-sans">
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between sm:items-start">
        <div className="flex flex-col place-items-center gap-2 text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-flower font-semibold leading-10 text-rose">
            outdoor reflections
          </h1>
          <DrawIcon svgPaths={SVG_PATHS.flowerIcon} strokeWidth={1.5} iconSize={80} fill={"#ce796b"} />
        </div>
        <StartButton />
      </div>
    </main>
  );
}
