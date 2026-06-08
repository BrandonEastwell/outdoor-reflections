"use client"
import {Calendar} from "@/components/ui/calendar";
import {useContext, useState} from "react";
import {EntryContext} from "@/utils/entryContext";

function formatISOToDisplayDate(ISODate: string): string {
    const date = new Date(ISODate);
    const weekDay = date.toLocaleDateString('default', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
    }).split("/").reverse().join(".");


    return `${weekDay}, ${formattedDate}`;
}

export default function DatePicker() {
    const { entry, setEntry } = useContext(EntryContext);
    const [displayDate, setDisplayDate] = useState<string>(formatISOToDisplayDate(entry.date));
    const [toggleDatePicker, setToggleDatePicker] = useState<boolean>(false);

    const onDateChange = (date: Date) => {
        setEntry({...entry, date: date.toISOString()});
        setDisplayDate(formatISOToDisplayDate(date.toISOString()));
        setToggleDatePicker(false);
    }

    return (
        <div className="relative">
            <span onClick={() => setToggleDatePicker(!toggleDatePicker)} className="cursor-pointer select-none">{displayDate}</span>
            { toggleDatePicker && <Calendar
                mode="single"
                selected={new Date(entry.date)}
                onSelect={(date) => date ? onDateChange(date) : null}
                className="absolute z-999 rounded-lg border [--cell-size:--spacing(6.5)]"
            /> }
        </div>
    )
}