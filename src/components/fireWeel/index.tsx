"use client";
import { auth } from "@/lib/firebase/firebaseConfig";
import useUser from "@/lib/store/user";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function FireWel() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (
          path === "/Sign-in" ||
          path === "/Sign-up" ||
          path === "/forgot-password"
        ) {
          router.push("/");
        }
        setUser(user);
      } else {
        
        setUser(null);
      }
    });
  console.log(user)
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [path, router, setUser, user]);

  return null;
}

export default FireWel;
