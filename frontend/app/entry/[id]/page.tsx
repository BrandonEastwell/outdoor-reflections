import EntryEditorLoader from "@/components/EntryEditorLoader";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <EntryEditorLoader id={id} />
    )
}