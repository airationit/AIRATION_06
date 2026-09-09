"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  dark?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
}

export function Logo({
  dark = false,
  className,
  href = "/",
  onClick,
}: LogoProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-2 sm:gap-2.5 select-none", className)}>
      <Image
        src="/images/icon.png"
        alt="Hirance Icon"
        width={36}
        height={36}
        className="h-7 sm:h-8 w-auto object-contain shrink-0"
        priority
      />
      <Image
        src={dark ? "/images/wordmark-white.png" : "/images/wordmark-navy.png"}
        alt="Hirance"
        width={110}
        height={28}
        className="h-5 sm:h-5.5 w-auto object-contain shrink-0"
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
        aria-label="Hirance Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
