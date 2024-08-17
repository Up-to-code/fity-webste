"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateUserWithEmailAndPassword,
  SignInWithGoogle,
} from "@/lib/firebase/AuthFuncs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const [from, setFrom] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const HandleSubmit = async () => {
    if (!from.email || !from.password || !from.name.first || !from.name.last) {
      toast({
        title: "Error 🚨🚨🚨",
        description: "Please fill all the fields",
      });
      return;
    }
    try {
      const res = await CreateUserWithEmailAndPassword(
        from.email,
        from.password,
        from.name.first + " " + from.name.last
      );
      if (res) {
        toast({
          title: "Success",
          description: "Login Successful",
        });
      } else {
        toast({
          title: "Error 🚨🚨🚨",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast({
        title: "Error 🚨🚨🚨",
        description: "Something went wrong",
      });
    }
  };
  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                onChange={(e) =>
                  setFrom({
                    ...from,
                    name: { ...from.name, first: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                onChange={(e) =>
                  setFrom({
                    ...from,
                    name: { ...from.name, last: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setFrom({ ...from, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setFrom({ ...from, password: e.target.value })}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-zinc-200 font-bold"
            onClick={() => HandleSubmit()}
          >
          
            Create an account
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => SignInWithGoogle()}
          >
            Sign with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/Sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
