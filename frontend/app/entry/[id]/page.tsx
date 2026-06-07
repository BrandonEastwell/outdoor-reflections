import EntryEditorLoader from "@/components/EntryEditorLoader";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main className="flex flex-col flex-1 items-center">
            <h1 className="max-w-xs text-3xl font-semibold font-flower tracking-wider text-black">Your reflections entry</h1>
            <EntryEditorLoader id={id} />
        </main>
    )
}