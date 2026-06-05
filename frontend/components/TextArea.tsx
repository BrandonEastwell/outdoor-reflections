"use client"

interface TextAreaProps {
    value: string | undefined;
    onChange: (value: string) => void;
    focus: boolean;
}

export default function TextArea({ value, onChange, focus }: TextAreaProps) {
    return (
        <textarea
            name="content"
            className={"relative z-20 min-h-[300px] h-auto font-mono outline-none outline-0 border-none bg-transparent w-full text-sm/1.7 text-black placeholder-black" + (focus ? "" : " pointer-events-none")}
            value={value}
            placeholder="How was your day?"
            disabled={!focus}
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
