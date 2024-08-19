"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { IoIosPlay } from "react-icons/io";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { Slider } from "../ui/slider";
import { FaPause } from "react-icons/fa";
import usePlayer, { Track } from "@/lib/store/music"; // Adjust the import path if necessary
import { getCollectionList } from "@/lib/firebase/FirebaseServes";
import { AiFillSound } from "react-icons/ai";

function Player() {
  const { 
    isPlay, 
    play, 
    next, 
    back, 
    togglePlay, 
    playList, 
    setPlayList,
    currentTime, 
    duration, 
    volume, 
    setVolume, 
    setCurrentTime 
  } = usePlayer((state) => ({
    isPlay: state.isPlay,
    play: state.play,
    next: state.next,
    back: state.back,
    togglePlay: state.togglePlay,
    playList: state.playList,
    setPlayList: state.setPlayList,
    currentTime: state.currentTime,
    duration: state.duration,
    volume: state.volume,
    setVolume: state.setVolume,
    setCurrentTime: state.setCurrentTime
  }));

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCollectionList("test");
        setPlayList(data as Track[]);
        setDataFetched(true);
        console.log("Fetched playlist:", data);
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
    }

    if (!dataFetched && playList.length === 0) {
      fetchData();
    }
  }, [dataFetched, playList.length, setPlayList]);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
  }, [setVolume]);

  const handleTimeChange = useCallback((value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
  }, [setCurrentTime]);

  return (
    <Card className="absolute bottom-0 w-full py-2">
      <CardHeader>
        <div className="text-center mb-2">
          <h3 className="text-lg font-semibold">{playList[0]?.title || "Track Title"}</h3>
        </div>
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

      <div className="flex flex-col items-center mb-2 px-4">
        <Slider
          value={[currentTime]}
          onValueChange={handleTimeChange}
          max={duration}
          step={1}
          className="w-full mb-1"
        />
        <div className="flex justify-between text-sm w-full">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center items-center mb-2 px-4 gap-5">
        <AiFillSound size={30}  className="text-primary mx-2"/>
        <Slider
          value={[volume * 100]} // Convert volume from 0-1 to 0-100
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-3/4"
        />
        <span className="ml-2 text-sm">{Math.round(volume * 100)}%</span>
      </div>
    </Card>
  );
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Player;
