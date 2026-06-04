"use client"

interface TextAreaProps {
    value: string | undefined;
    onChange: (value: string) => void;
}

export default function TextArea({ value, onChange }: TextAreaProps) {
    return (
        <textarea
            name="content"
            className="min-h-[300px] h-auto font-mono w-full text-sm text-black placeholder-black z-20"
            value={value}
            placeholder="How was your day?"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}