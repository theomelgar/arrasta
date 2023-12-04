import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition flex items-center gap-x-1 ">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={30}
          width={30}
        />
        <p className={cn(
          "text-lg text-neutral-700",
          headingFont.className,
        )}>
          Arrasta
        </p>
      </div>
    </Link>
  );
};