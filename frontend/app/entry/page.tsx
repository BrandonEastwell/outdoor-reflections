import EntryArea from "@/components/EntryArea";

export default function Page() {

    return (
        <main className="flex flex-col flex-1 items-center">
            <h1 className="max-w-xs text-3xl font-semibold font-flower tracking-wider text-black">Your reflections entry</h1>
            <EntryArea />
        </main>
    )
}