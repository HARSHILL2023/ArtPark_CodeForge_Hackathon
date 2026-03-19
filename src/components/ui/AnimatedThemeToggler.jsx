"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "../../lib/utils"

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}) => {
    const [isDark, setIsDark] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        updateTheme()

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [])

    const toggleTheme = useCallback(() => {
        const button = buttonRef.current
        if (!button) return

        const { top, left, width, height } = button.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2

        const viewportWidth = window.visualViewport?.width ?? window.innerWidth
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight

        const maxRadius = Math.hypot(
            Math.max(x, viewportWidth - x),
            Math.max(y, viewportHeight - y)
        )

        const applyTheme = () => {
            const newTheme = !isDark
            setIsDark(newTheme)
            document.documentElement.classList.toggle("dark")
            localStorage.setItem("theme", newTheme ? "dark" : "light")
        }

        if (typeof document.startViewTransition !== "function") {
            applyTheme()
            return
        }

        const transition = document.startViewTransition(() => {
            flushSync(applyTheme)
        })

        const ready = transition?.ready
        if (ready && typeof ready.then === "function") {
            ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${maxRadius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration,
                        easing: "ease-in-out",
                        pseudoElement: "::view-transition-new(root)",
                    }
                )
            })
        }
    }, [isDark, duration])

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn(
                "bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95 group overflow-hidden relative",
                className
            )}
            {...props}
        >
            <div className="relative z-10">
                <AnimateIllustration isDark={isDark} />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

const AnimateIllustration = ({ isDark }) => {
    return (
        <div className="relative w-5 h-5 flex items-center justify-center">
            {/* Sun Icon */}
            <Sun
                className={cn(
                    "w-5 h-5 transition-all duration-500 ease-in-out",
                    isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
                    "text-amber-500"
                )}
            />
            {/* Moon Icon */}
            <Moon
                className={cn(
                    "w-5 h-5 absolute transition-all duration-500 ease-in-out",
                    isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
                    "text-indigo-400"
                )}
            />
        </div>
    )
}
