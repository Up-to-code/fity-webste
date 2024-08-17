"use client";

import { Button } from "@/components/ui/button";
import { SignOut } from "@/lib/firebase/AuthFuncs";

export function SonnerDemo() {
  return (
    <>
      <Button onClick={() => SignOut()}>SignOut</Button>
    </>
  );
}
