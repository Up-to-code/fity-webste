"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "../ui/label";
import { SelectTime } from "./SelecktTime";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="py-4">
        <div className="max-w-screen-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription className="mt-1 max-w-80">
              This is where you can set your preferences. yuo can set the your
              time and play your muisc
            </DrawerDescription>
            <div className="my-4 flex  flex-col gap-4">
              <Label
                htmlFor="time"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Time
              </Label>
              <SelectTime />
            </div>
            <div className="my-4 flex  flex-col gap-4">
              <Label
                htmlFor="time"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Muisc
              </Label>
               
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button className="text-white  font-bold px-10 rounded border-2 border-[#0f5a9fea] shadow-primary shadow-md">
              Start
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
