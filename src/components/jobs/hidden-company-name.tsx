"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

const message = "Download the Hirance app to view this company's name.";

export function HiddenCompanyName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const dismiss = (event: PointerEvent) => {
      if (!triggerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen} triggerId={triggerId}>
        <Tooltip.Trigger
          id={triggerId}
          render={<span ref={triggerRef} tabIndex={0} />}
          delay={200}
          closeOnClick={false}
          aria-label={message}
          className={cn(
            "inline-block max-w-full cursor-help rounded-sm align-baseline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            className
          )}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
          }}
        >
          <span aria-hidden="true" className="block truncate select-none blur-[3px]">
            {name}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8} collisionPadding={12} className="z-[100]">
            <Tooltip.Popup className="max-w-[min(15rem,calc(100vw-2rem))] rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-medium leading-relaxed text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
              {message}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
