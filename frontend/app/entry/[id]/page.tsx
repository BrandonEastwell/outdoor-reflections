import EntryEditorLoader from "@/components/EntryEditorLoader";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main className="flex flex-col flex-1 items-center">
            <EntryEditorLoader id={id} />
        </main>
    )
}