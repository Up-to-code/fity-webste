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
  SignInWithEmailAndPassword,
  SignInWithGoogle,
} from "@/lib/firebase/AuthFuncs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [from, setFrom] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!from.email || !from.password) {
      toast({
        title: "Error 🚨🚨🚨",
        description: "Please fill all the fields",
      });
      return;
    }

    try {
      const res = await SignInWithEmailAndPassword(from.email, from.password);
      if (res) {
        toast({
          title: "Success",
          description: "Login Successful",
        });
      } else {
        toast({
          title: "Error 🚨🚨 🚨",
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
    <Card className="mx-auto max-w-sm flex-1 my-5 ">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setFrom({ ...from, password: e.target.value })}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-zinc-300 font-bold"
            onClick={() => handleSubmit()}
          >
            Sign in
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => SignInWithGoogle()}
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/Sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
