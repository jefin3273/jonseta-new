"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  // const [country, setCountry] = useState("IN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/Jonseta.png"
            alt="Jonseta"
            width={100}
            height={100}
            className="w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Log in</Button>
            </SignInButton>
          </SignedOut>

          <button className="flex items-center gap-1 px-2 py-1 text-sm">
            <Image
              src="/flags/in.svg"
              alt="India"
              width={20}
              height={15}
              className="rounded"
            />
            <span>India</span>
          </button>

          {/* <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <Link href="/locations">Locations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/vehicles">Vehicles</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services">Services</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
