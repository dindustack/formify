import Link from "next/link";
import React from "react";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-3xl text-[#151517] hover:cursor-pointer"
    >
      Formify
    </Link>
  );
}
