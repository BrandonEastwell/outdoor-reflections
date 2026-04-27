import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#F9F7F3] pt-32 pb-16 px-16 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Outdoor Reflections
          </h1>

        </div>
        <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-background transition-colors bg-[#ce796b] hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href=" "
            target="_blank"
            rel="noopener noreferrer"
        >
          Let's start
        </a>
      </main>
    </div>
  );
}
