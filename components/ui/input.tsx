import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary h-9 w-full min-w-0 px-6 py-1 text-base shadow-none transition-none outline-none rounded-none border-0",
        "focus:ring-0 focus-visible:ring-0 focus:outline-none",
        "aria-invalid:ring-0 aria-invalid:border-0",
        className
      )}
      {...props}
    />
  );
}

export { Input };
