import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="px-[100] py-4 grid grid-cols-3">
      <div>
        <div></div>
        <span className="font-headline text-headline_2 font-bold text-secondary md:text-black">
          AskIt
        </span>
      </div>
      <div></div>
      <div></div>
    </nav>
  );
}
