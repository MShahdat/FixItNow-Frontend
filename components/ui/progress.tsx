import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({ className, value, ...props }: React.ComponentProps<"progress">) {
  return (
    <progress
      value={value}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    />
  )
}

export { Progress }
