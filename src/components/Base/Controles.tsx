
"use client";
import { Button } from "../ui/button";
import { SlidersVertical } from "lucide-react";
import { useTimer } from "@/lib/store/Timer"; // Adjust the import path accordingly

function Controles() {
  const { setTime, startTimer, stopTimer, resetTimer } = useTimer();

  const handleStartTimer = (minutes: number) => {
    stopTimer(); // Stop any running timer
    resetTimer(); // Reset the timer to 0
    startTimer(); // Start the timer
    setTimeout(stopTimer, minutes * 60 * 1000); // Stop the timer after the specified minutes
  };

  return (
    <div className="w-full flex justify-center items-center gap-5">

      <Button
        onClick={() => handleStartTimer(50)}
        className="text-foreground font-bold px-10 rounded border-2 border-[#0f5a9fea] shadow-primary shadow-md"
      >
        50 min
      </Button>
      <Button
        onClick={() => handleStartTimer(25)}
        className="text-foreground font-bold px-10 rounded border-2 border-[#0f5a9fea] shadow-primary shadow-md"
      >
        25 min
      </Button>
    </div>
  );
}

export default Controles;
