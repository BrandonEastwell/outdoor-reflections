
export default function EntryLayout({ children } : { children: React.ReactNode }) {


    return (
        <div className="flex flex-col min-h-screen bg-[#F9F7F3] pt-16 pb-16 px-8">
            <div>{children}</div>
            <div className="fixed bottom-0 z-50 px-8 pb-2 right-0">
                <button type="submit" form="journal-entry-form" className="font-flower text-rose text-2xl">
                    Save
                </button>
            </div>
        </div>
    )
}