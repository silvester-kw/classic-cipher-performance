import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex mb-4 container font-mono py-4 text-lg">
      <ul className="flex w-full justify-between font-medium">
        <Link href="/autokey-vigenere-cipher">
          <li className="hover:font-bold border-4 rounded-lg p-2 border-[#b9924a]">Autokey Vigenere Cipher</li>
        </Link>
        <Link href="/playfair-cipher">
          <li className="hover:font-bold border-4 rounded-lg p-2 border-[#666AC1]">Playfair Cipher</li>
        </Link>
        <Link href="/vigenere-cipher">
          <li className="hover:font-bold border-4 rounded-lg p-2 border-[#EA4A31]">Vigenere Cipher</li>
        </Link>
      </ul>
    </div>
  );
}
