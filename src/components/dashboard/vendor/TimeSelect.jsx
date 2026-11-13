
"use client";

import { useState } from "react";
import { Popover, Button } from "@heroui/react";
import { Clock } from "lucide-react";

export default function TimeSelect({ value, onChange, name = "time" }) {
    const [isOpen, setIsOpen] = useState(false);

    const hours = Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );

    const [hour, setHour] = useState("10");
    const [minute, setMinute] = useState("00");
    const [period, setPeriod] = useState("AM");

    const updateTime = (h, m, p) => {
        const time = `${h}:${m} ${p}`;
        onChange?.(time);
    };

    const handleInputChange = (e) => {
        onChange?.(e.target.value);
    };

    const selectHour = (h) => {
        setHour(h);
        updateTime(h, minute, period);
    };

    const selectMinute = (m) => {
        setMinute(m);
        updateTime(hour, m, period);
    };

    const selectPeriod = (p) => {
        setPeriod(p);
        updateTime(hour, minute, p);
    };

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <div className="relative w-full">
                    <input
                        type="text"
                        inputMode="text"
                        name={name}
                        value={value}
                        onChange={(e) => {
                            let val = e.target.value
                                .toUpperCase()
                                .replace(/[^0-9: AP]/g, "")
                                .replace(/ {2,}/g, " ")
                                .slice(0, 8);

                            onChange(val);
                        }}
                        placeholder="HH:MM AM"
                        maxLength={8}
                        className="w-full p-2 rounded-xl px-3 text-sm shadow-sm focus:border-blue-500 dark:text-white"
                    />
                    <Clock
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </Popover.Trigger>

            <Popover.Content className="w-72 p-3">
                <div className="space-y-3">
                    <p className="text-sm font-semibold">Select Time</p>

                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <p className="mb-2 text-xs text-gray-500">Hour</p>
                            <div className="h-36 space-y-1 overflow-y-auto scrollbar-hide">
                                {hours.map((h) => (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => selectHour(h)}
                                        className={`w-full rounded-lg py-2 text-sm ${hour === h
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xs text-gray-500">Minute</p>
                            <div className="h-36 space-y-1 overflow-y-auto scrollbar-hide">
                                {minutes.map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => selectMinute(m)}
                                        className={`w-full rounded-lg py-2 text-sm ${minute === m
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xs text-gray-500">Period</p>
                            {["AM", "PM"].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => selectPeriod(p)}
                                    className={`mb-1 w-full rounded-lg py-2 text-sm ${period === p
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    );
}
