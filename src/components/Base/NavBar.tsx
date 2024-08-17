"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "../common/Dark";
import Link from "next/link";
import { Card } from "../ui/card";
import useUser from "@/lib/store/user";
import Image from "next/image";

function NavBar() {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="p-4 flex justify-between items-center bg-background text-foreground shadow-sm px-5">
      <Link href="/">
        <h1 className="text-2xl font-bold">Fity</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <p>{user.displayName}</p>
               {
                user.photoURL ? (
                  <Image
                    src={user.photoURL as string}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={""}
                  />
                ) : null
               }
            </>
          ) : (
            <>
              <Link href={"/Sign-in"}>Sign-in</Link>
              <Link href={"/Sign-up"}>Sign-up</Link>
            </>
          )}
        </nav>
        {isMounted && <ModeToggle />}
      </div>
    </Card>
  );
}

export default NavBar;
