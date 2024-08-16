"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "../common/Dark";
import Link from "next/link";
import { Card } from "../ui/card";

interface NavBarProps {
  links: { name: string; href: string }[];
}

function NavBar({ links }: NavBarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="p-4 flex justify-between items-center bg-background text-foreground shadow-sm px-5">
      <h1 className="text-2xl font-bold">Fity</h1>
      <div className="flex gap-4 items-center">
        <nav className="flex gap-4 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {isMounted && <ModeToggle />}
      </div>
    </Card>
  );
}

export default NavBar;
