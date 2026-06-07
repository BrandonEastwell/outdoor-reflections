import Link from "next/link";
import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#F9F7F3] pt-32 pb-16 px-16 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Outdoor Reflections
          </h1>

        </div>
        <StartButton />
      </main>
    </div>
  );
}
