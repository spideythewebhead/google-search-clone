import React from "react";

import { Avatar } from "@components/avatar";
import { ThemeToggle } from "@components/theme-toggle";
import { ViewGridIcon } from "@heroicons/react/solid";
import Link from "next/link";

function LinkWidget({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href}>
      <a className="text-xs text-gray-500 hover:underline">{text}</a>
    </Link>
  );
}

export function TopBar() {
  return (
    <div className="w-full flex flex-row px-4 py-2 shadow-sm justify-between items-center">
      <div className="flex flex-row items-center">
        <ThemeToggle />
      </div>

      {/* right group */}
      <div className="flex flex-row space-x-3 items-center">
        <LinkWidget href="/app-gmail" text="Gmail" />
        <LinkWidget href="/app-images" text="Images" />

        <ViewGridIcon className="h-5 w-5 text-gray-500" />

        <Avatar />
      </div>
    </div>
  );
}
