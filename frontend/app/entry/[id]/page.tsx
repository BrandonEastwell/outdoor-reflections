import EntryEditorLoader from "@/components/EntryEditorLoader";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <main className="flex flex-col flex-1 items-center">
            <h1 className="max-w-xs text-3xl font-semibold font-flower tracking-wider text-black">Your reflections entry</h1>
            <EntryEditorLoader id={params.id} />
        </main>
    )
}