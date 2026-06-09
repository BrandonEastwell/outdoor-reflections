"use client"

import { AnimatePresence, motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedLabelProps {
    show: boolean;
    children: ReactNode;
    className?: string;
}

export default function AnimatedLabel({ show, children, className = "font-bold" }: AnimatedLabelProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.span
                    className={className}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                >
                    {children}
                </motion.span>
            )}
        </AnimatePresence>
    );
}
