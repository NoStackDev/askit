import Link from "next/link";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="px-[100] py-4 grid grid-cols-3">
      <Link href="/" className="max-w-fit flex gap-2 items-center">
        <div className="w-6 h-6 bg-primary"></div>
        <span className="font-headline text-headline_2 font-bold text-secondary md:text-black">
          AskIt
        </span>
      </Link>

      <div></div>
      <div></div>
    </nav>
  );
}
