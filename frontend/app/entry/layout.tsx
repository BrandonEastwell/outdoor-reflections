
export default function EntryLayout({ children } : { children: React.ReactNode }) {


    return (
        <div className="flex flex-col min-h-screen bg-[#F9F7F3] pt-16 pb-16 px-8">
            <div>{children}</div>
        </div>
    )
}