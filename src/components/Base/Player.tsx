"use client";
import React, { useEffect } from "react";
import { Card, CardHeader } from "../ui/card";
import { IoIosPlay } from "react-icons/io";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { Slider } from "../ui/slider";
import { FaPause } from "react-icons/fa";
import usePlayer from "@/lib/store/muisc"; // Adjust the import path if necessary
import { getCollection } from "@/lib/firebase/FirebaseServes";

function Player() {
  const { isPlay, play, next, back, togglePlay ,playList ,playlistName } = usePlayer();
  useEffect(() => {
   async function fetchData() {
      try {
       const data = await getCollection()
       console.log(data)
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
    }
    fetchData()
  }, [playList,playlistName])
  return (
    <Card className="absolute bottom-0 w-full py-2">
      <CardHeader>
        <div className="flex justify-center items-center">
          <div className="mr-2 cursor-pointer" onClick={back}>
            <GiPreviousButton size={30} />
          </div>
          <div
            onClick={togglePlay}
            className="flex justify-center bg-primary rounded-full w-max p-2 cursor-pointer"
          >
            {isPlay ? <FaPause size={30} /> : <IoIosPlay size={30} />}
          </div>
          <div className="ml-2 cursor-pointer" onClick={next}>
            <GiNextButton size={30} />
          </div>
        </div>
      </CardHeader>

      <div className="flex justify-center mb-2">
        <Slider
          onValueChange={console.log}
          defaultValue={[33]}
          max={100}
          step={1}
          className="max-w-96 m-auto"
        />
      </div>
    </Card>
  );
}

export default Player;
