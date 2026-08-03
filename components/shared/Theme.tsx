"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function Theme() {
  const [isMoon, setIsMoon] = React.useState(false)

  return (
    <Toggle
      pressed={isMoon}
      onPressedChange={setIsMoon}
      aria-label="Toggle sun and moon"
      className="relative h-10 w-10 rounded-full p-0 data-[state=on]:bg-muted"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${isMoon ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
      />

      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${isMoon ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
      />
    </Toggle>
  )
}
