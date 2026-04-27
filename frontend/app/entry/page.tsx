import EntryForm from "@/components/EntryForm";

export default function Page() {

    return (
        <main className="flex flex-col flex-1 items-center">
            <h1 className="max-w-xs text-3xl font-semibold font-flower tracking-wider text-black">Your reflections entry</h1>
            <div className="flex flex-col grow w-full gap-2 px-3 pb-3 pt-2 bg-white rounded-2xl mt-4">
                <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                    <span className="">saturday, 27.04</span>
                    <span>0</span>
                </div>
                <div className="flex flex-col flex-1 bg-[#ecc8af]/40 rounded-2xl p-3">
                    <EntryForm />
                </div>
            </div>
        </main>
    )
}