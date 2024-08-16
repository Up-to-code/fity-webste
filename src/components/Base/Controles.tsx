import React from "react";
import { Button } from "../ui/button";
import {  SlidersVertical } from "lucide-react";

function Controles() {
  return (
    <div className="w-full  flex   justify-center items-center gap-5">
        <Button  className=" text-foreground  font-bold  rounded border-2 border-[#0f5a9fea] shadow-primary shadow-md">
        <SlidersVertical  className="text-foreground"/>
        </Button>
       <Button className=" text-foreground  font-bold px-10 rounded border-2 border-[#0f5a9fea] shadow-primary shadow-md">
         Start
       </Button>
    </div>
  );
}

export default Controles;
