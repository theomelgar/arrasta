import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-1 md:block md:w-auto flex items-center justify-between ">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
          <Button className="bg-orange-400 text-black" variant="orange" size="sm" asChild>
            <Link href="/sign-up">
              Try Arrasta for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};