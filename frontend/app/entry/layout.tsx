
export default function EntryLayout({ children } : { children: React.ReactNode }) {


    return (
        <main className="flex flex-col flex-1 min-h-screen pb-16 items-center">
            {children}
        </main>
    )
}